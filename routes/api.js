var express = require('express');
var router = express.Router();
var DB = require('./db');
var passport = require('./passport');
var Validate = require('./validate');
var path = require('path');

function loggedinOrRedirectTo(to){
    return function(req, res, next){
        if(req.user){
            next();
        }else{
            res.redirect(to);
        }
    }
}

/* Routing~~~ */
router.get('/cookie', function(req, res, next) {
    return res.json(req.session);
});

router.post('/login'
    , passport.authenticate('login', {successRedirect: '/', failureRedirect: '/login'})
    , (req, res)=>{//Don't go now.
        res.redirect('/');
    });

router.get('/logout', function(req, res, next) {
    if(req.user){//session.passport){
        req.session.destroy(function(err){
            if(err){
                console.err(err);
                return res.json({success: false, err: err});
            }
            return res.redirect('/');
        });
    }else{
        return res.redirect('/');
    }
});

router.get('/existemail/:email', function(req, res, next){
    DB.User.findOne({email: req.params.email}, {}, (err, exist)=>{
        if(err){
            console.err(err);
            res.json({success: false, error: err});
        }else if(exist){
            res.json({success: true, valid: false});
        }else if(Validate.validateEmail(req.params.email)){
            res.json({success: true, valid: true});
        }else{
            res.json({success: true, valid: false});
        }
    });
});

router.get('/existnickname/:nickname', function(req, res, next){
    DB.User.findOne({nickname: req.params.nickname}, {}, (err, exist)=>{
        if(err){
            console.err(err);
            res.json({success: false, error: err});
        }else if(exist){
            res.json({success: true, valid: false});
        }else if(Validate.validateNickname(req.params.nickname)){
            res.json({success: true, valid: true});
        }else{
            res.json({success: true, valid: false});
        }
    });
});

var Hash = require('./hash');
router.post('/register'
    , Validate.validateRegForm
    , Hash.pwHash
    , function(req, res, next) {
        var user = new DB.User();
        user.email = req.body.email;
        user.password = req.body.pw;//need to be hashed
        user.nickname = req.body.nickname;
        user.category = req.body.category;
        user.university = req.body.univ;
        user.major = req.body.major;
        user.salt = req.body.salt;
        user.valid = false;//for email validate??

        user.save((err)=>{
            if(err){
                console.error(err);
                res.json({success: false, reason: "Unknown Error: " + err});
                return;
            }
            return res.redirect('/login');//make register_success page
        });
    });

var multer  = require('multer')
var randomstring = require('randomstring');
var fs = require('fs');
var mkdirp = require('mkdirp');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //save file to GGP/uploads/projectID
        cb(null, path.join('uploads', req.projectID));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + randomstring.generate() + path.extname(file.originalname));
    }
});
function setProjectIDAndMakeDirectory(req, res, next){
    //ISO Date String. remove ':' and '.'
    var date = new Date().toISOString().replace(/:/g, '').replace(/\./g, '');
    var id = date + "_" + randomstring.generate();
    req.projectID = id;
    mkdirp('uploads/' + id, (err)=>{
        if(err){
            console.log(err);
            res.status(500).render('error');
        }else{
            next();
        }
    });
}
var upload = multer({ storage: storage })
router.post('/upload'
    , loggedinOrRedirectTo('/login')
    , setProjectIDAndMakeDirectory
    , upload.array('photo', 3)
    , function(req, res, next){
        var project = new DB.Project();
        project.id = req.projectID
        project.name = req.body.title;
        project.category = req.body.category;
        project.summary = req.body.summary;
        project.content = req.body.content;
        project.photos = req.files.map((file)=>file.path);
        project.writer = req.user.email;//change to objectid later.

        project.commentCount = 0;
        project.likeCount = 0;
        project.likedUser = [];
        project.viewed = 123;
        //project.date = Date.now;//default
        //project.valid = true;//default

        project.save((err)=>{
            if(err){
                console.error(err);
                res.json({success: false, reason: "Unknown Error: " + err});
                return;
            }
            res.redirect('/');
        });
    });

router.get('/content'
    , function(req, res, next){
        DB.Project.find({valid: true}
            , { id: 1,
                name: 1,
                category: 1,
                summary: 1,
                content: 1,
                photos: 1,
                writer: 1,
                commentCount: 1,
                likeCount: 1,
                likedUser: 1,
                viewed: 1,
                date: 1,}
            , (err, projects)=>{
                res.json(projects);
            }).limit(15);
    });

var codeTable = require('./codeTable');
router.use(codeTable);

module.exports = router;
