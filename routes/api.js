var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var DB = require('./db');
var passport = require('./passport');

/* Routing~~~ */
router.get('/', function(req, res, next) {
  res.send('respond with a resource GET. this is /api');
});
router.get('/test', function(req, res, next) {
  res.send('respond with a resource GET. this is /api/test');
});
router.get('/pptest', function(req, res, next) {
    var session = req.session;
    session.username = req.query.name;
    return res.json(session);
});
router.get('/cookie', function(req, res, next) {
    return res.json(req.session);
});
router.get('/logout', function(req, res, next) {
    if(req.session.passport){
        req.session.destroy(function(err){
            console.log('test');
            if(err){
                console.log(err);
                return res.json({success: false});
            }
        });
    }
    return res.redirect('/');
});

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/test'}), (req, res)=>{
        console.log('auth Test!!!!');
        res.redirect('/api/cookie');
    });
router.post('/register', function(req, res, next) {
    var user = new DB.User();
    user.email = req.body.email;
    user.password = req.body.pw;//need to be hashed
    user.nickname = "Nooo!!";
    user.category = req.body.category;
    user.university = req.body.univ;
    user.major = req.body.major;
    user.valid = false;
    var pwConfirm = req.body.pwConfirm;

    //Fail Reason needed?? Talk with HW.
    DB.User.find({email: user.email},{_id: 0, email: 1, nickname: 1, password: 1}, (err, users)=>{
        if(err){
            res.json({success: false, reason: "Unknown Error: " + err});
        }else if(users.length > 0){//Email already used!
            res.json({success: false, reason: "ID(email) Already Exists"});
        }else if(user.password != pwConfirm){//confirm password!
            res.json({success: false, reason: "PW Confirm Not Match"});
        }else if(!validatePW(user.password)){//password condition check
            res.json({success: false, reason: "PW Validation Failed"});
        }else if(!validateCategory(user.category)){
        }else if(!validateUniv(user.university)){
        }else if(!validateMajor(user.major)){
        }else{
            user.save((err)=>{
                if(err){
                    console.error(err);
                    res.json({success: false, reason: "Unknown Error: " + err});
                    return;
                }
                res.json({success: true, id: user.email});
            });
        }

    });
});

function validatePW(pw){
    return true;
}

function validateCategory(cg){
    return true;
}

function validateUniv(univ){
    return true;
}

function validateMajor(major){
    return true;
}



module.exports = router;
