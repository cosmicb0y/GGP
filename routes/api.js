var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var DB = require('./db');
var passport = require('./passport');
var validate = require('./validate');

/* Routing~~~ */
router.get('/test', function(req, res, next) {
    //var session = req.session;
    //session.username = req.query.name;
    //return res.json(session);
    res.send('respond with a resource GET. this is /api/test');
});

router.get('/cookie', function(req, res, next) {
    return res.json(req.session);
});

router.post('/login'
    , passport.authenticate('login', {failureRedirect: '/api/test'})
    , (req, res)=>{
        res.render('contents');
    });

router.get('/logout', function(req, res, next) {
    if(req.session.passport){
        req.session.destroy(function(err){
            if(err){
                console.err(err);
                return res.json({success: false});
            }
            res.redirect('/');
        });
    }
    return res.redirect('/');
});

router.get('/existemail/:email', function(req, res, next){
    DB.User.findOne({email: req.params.email}
        , {}
        , (err, exist)=>{
            if(err){
                res.json({success: false, err: err});
            }else if(exist){
                res.json({success: true, exist: true});
            }else{
                res.json({success: true, exist: false});
            }
        });
});

router.get('/existnickname/:nickname', function(req, res, next){
    DB.User.findOne({nickname: req.params.nickname}
        , {}
        , (err, exist)=>{
            if(err){
                res.json({success: false, err: err});
            }else if(exist){
                res.json({success: true, exist: true});
            }else{
                res.json({success: true, exist: false});
            }
        });
});

router.post('/register', function(req, res, next) {
    var user = new DB.User();
    user.email = req.body.email;
    user.password = req.body.pw;//need to be hashed
    user.nickname = req.body.nickname;
    user.category = req.body.category;
    user.university = req.body.univ;
    user.major = req.body.major;
    user.valid = false;//for email validate??
    var pwConfirm = req.body.pwConfirm;

    //Fail Reason needed?? Talk with HW.
    DB.User.findOne({ $or: [ {email: user.email}, {nickname: user.nickname} ] }
        ,{_id: 0, email: 1, nickname: 1, password: 1}
        ,(err, exist)=>{
            if(err){
                res.json({success: false, reason: "DB Error: " + err});
            }else if( exist ){
                res.json({success: false, reason: "ID or Nickname Already Exists"});
            }else if( ! validate.validateRegForm(user, pwConfirm) ){
                res.json({success: false, reason: "Reg form isn't valid"});
            }else{
                user.save((err)=>{
                    if(err){
                        console.error(err);
                        res.json({success: false, reason: "Unknown Error: " + err});
                        return;
                    }
                    return res.redirect('/');
                });
            }

        }
    );
});

module.exports = router;
