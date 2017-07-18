var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var DB = require('./db');

/* Routing~~~ */
router.get('/', function(req, res, next) {
  res.send('respond with a resource GET. this is /api');
});
router.get('/test', function(req, res, next) {
  res.send('respond with a resource GET. this is /api/test');
});
router.post('/login', function(req, res, next) {
    var result = '';
    for(i in req.body){
        result = result + "received " + i + " : " + req.body[i] + "<br>";
        console.log(i + " " + req.body[i]);
    }
    DB.User.find({email: req.body.id}, {_id: 0, password: 1}, (err, users) => {
        if(err){
            return res.status(500).json({error: err});
        }
        if(users.length === 0){
            return res.status(404).json({error: 'user not found'});
        }
        //for(i in users[0]){
        //    console.log(i + users[0][i]);
        //}
        if(users[0].password === req.body.pw){
            res.json({success: true});
        }else{
            res.json({success: false});
        }
        //res.send(users[0].password);
    });
    //res.send(result);
});
router.post('/register', function(req, res, next) {
    //result = '';
    var user = new DB.User();
    user.email = req.body.email;
    user.nickname = "Nooo!!";
    user.category = req.body.category;
    user.university = req.body.univ;
    user.major = req.body.major;
    user.password = req.body.pw;//need to be hashed
    var pwConfirm = req.body.pwConfirm;

    if(user.password == pwConfirm){
        user.save((err)=>{
            if(err){
                console.error(err);
                res.json({success: false});
                return;
            }
            res.json({success: true, id: user.email});
        });
    }else{
        res.json({success: false, reason: "PW Confirm Not Match"});
    }
    /*for(i in req.body){
        result = result + "received " + i + " : " + req.body[i] + "<br>";
        console.log(i + " " + req.body[i]);
    }*/
    //res.send(result);
});

module.exports = router;
