var express = require('express');
var router = express.Router();
var DB = require('./db');
var passport = require('./passport');
var Validate = require('./validate');
var path = require('path');

/* Routing~~~ */
router.get('/test', function(req, res, next) {
    if(req.session.passport){
        res.send('You logged in!!');
    }else{
        res.send('respond with a resource GET. this is /api/test');
    }
});

router.get('/cookie', function(req, res, next) {
    return res.json(req.session);
});

router.post('/login'
    , passport.authenticate('login', {successRedirect: '/', failureRedirect: '/login'})
    , (req, res)=>{//Don't go now.
        res.redirect('/');
    });

router.get('/logout', function(req, res, next) {
    if(req.session.passport){
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

router.post('/register', Validate.validateRegForm, function(req, res, next) {
    var user = new DB.User();
    user.email = req.body.email;
    user.password = req.body.pw;//need to be hashed
    user.nickname = req.body.nickname;
    user.category = req.body.category;
    user.university = req.body.univ;
    user.major = req.body.major;
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
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/test')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({ dest: 'uploads/', storage: storage })
router.post('/upload'
    , upload.array('photo', 3)
    , function(req, res, next){
        console.log(req);
        if(! req.user){
            res.redirect('/login');
            return;
        }
        var project = new DB.Project();
        project.name = req.body.title;
        project.summary = req.body.summary;
        project.category = req.body.category;
        project.content = req.body.content;
        project.photos = req.files.map((file)=>file.path);
        project.writer = req.user.email;//change to objectid later.
        project.likeCount = 0;
        project.likedUser = [];
        project.commentCount = 0;
        project.projectNumber = 0;
        project.viewd = 123;

        //console.log(req.files);
        //res.json(req.files);
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
        DB.Project.find({nickname: req.params.nickname}, {}, (err, projects)=>{
            res.json(projects);
        });
    });

module.exports = router;
