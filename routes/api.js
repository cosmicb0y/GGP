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
        project.viewed = 0;
        //project.date = Date.now;//default
        //project.valid = true;//default

        project.save((err)=>{
            if(err){
                console.error(err);
                res.json({success: false, reason: "Unknown Error: " + err});
                return;
            }
            res.redirect('/');//Change to success json.(process at front)
        });
    });

router.get('/content'//require category, page
    , function(req, res, next){
        DB.Project.find({valid: true}
            , { _id: 0,//for calling this project
                name: 1,
                //thumebnail: 1, // Add later
                category: 1,
                summary: 1,
                //content: 1,//Don't need now.
                photos: 1,//make thumbnail later.
                writer: 1,
                commentCount: 1,
                likeCount: 1,
                //likedUser: 1,//Don't need now.
                viewed: 1,
                date: 1,}
            , (err, projects)=>{
                projects.success = true;
                res.json(projects);
            }).limit(15);
    });

router.post('/comment'
    , loggedinOrRedirectTo('/login')
    , (req, res, next) => {
        var comment = new DB.Comment();
        comment.writer = req.user.nickname;
        comment.project = req.body.project;
        comment.content = req.body.content;
        //comment.date = Date.now;
        
        comment.save((err)=>{
            if(err){
                console.log(err);
                res.json({success: false, reason: "DB Error: " + err});
                return;
            }else{
                DB.Project.update( {id: comment.project}
                    , { $inc: { "commentCount": 1 } }
                    , (err, proj)=>{
                        if(err){
                            console.log(err);
                            res.json({success: false, reason: "DB Error: " + err});
                            return;
                        }else if( ! proj ){
                            res.json({success: false, reason: "No project: " + comment.project});
                        }else{
                            //proj.commentCount.$inc();
                            console.log(proj);
                            res.json({success: true});
                        }
                    });
            }
        });
    });
router.get('/comment/:project'
    //, loggedinOrRedirectTo('/login')
    , (req, res, next) =>{
        DB.Comment.find({project: req.params.project}
            , {_id: 0, content: 1, project: 1, date: 1}
            , (err, comments)=>{
                if(err){
                    res.json({success: false, reason: "DB Error: " + err});
                    return;
                }else{
                    comments.success = true;
                    res.json(comments);
                    return;
                }
            });
    });
var codeTable = require('./codeTable');
router.use(codeTable);

module.exports = router;
