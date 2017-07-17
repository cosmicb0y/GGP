var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//var bodyParser = require('body-parser');
//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: false }));

//*
//DB Connecting/Setting. Move to other module later.
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/ggp_test');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    //id: Schema.Types.ObjectId,
    email: String,
    password: String,//need to be hashed
    nickname: String,
    category: String,
    university: String,
    major: String,
    reg_date: { type: Date, default: Date.now }
}, {strict: false, autoindex: true});
var User = mongoose.model('user', userSchema);
//*/

/* Routing~~~ */
router.get('/', function(req, res, next) {
  res.send('respond with a resource GET. this is /api');
});
router.get('/test', function(req, res, next) {
  res.send('respond with a resource GET. this is /api/test');
});
router.post('/register', function(req, res, next) {
    //result = '';
    var user = new User();
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
            res.json({isuccess: true, id: user.email});
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
