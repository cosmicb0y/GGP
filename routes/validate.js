var randstr = require('randomstring');
var crypto = require('crypto');
var hashsum = crypto.createHash('sha256');
var DB = require('./db');

var Validate = {};

Validate.validateRegForm = function(req, res, next){
    console.log(req.body)
    if( req.body.pw != req.body.pwConfirm
        || ! validatePW(req.body.pw)
        || ! validateCategory(req.body.category)
        || ! validateUniv(req.body.univ)
        || ! validateMajor(req.body.major) ){
        return res.render("error", {
            message: "Form validation failed!",
            error: {status:"", stack:""}});
    }
    DB.User.findOne({ $or: [ {email: req.body.email}, {nickname: req.body.nickname} ] }
        ,{_id: 0, email: 1, nickname: 1, password: 1}
        ,(err, exist)=>{
            if(err){
                console.err(err);
                //return res.render("error", {
                //    message: "Form validation failed!",
                //    error: {status:"", stack:""}});
                res.status(500).render('error');
            }else if( exist ){
                return res.render("error", {
                    message: "Form validation failed!",
                    error: {status:"", stack:""}});
            }else{
                next();
            }
        }
    );
}

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

function validateEmail(email){
    return true;
}
Validate.validateEmail = validateEmail;

function validateNickname(nickname){
    return true;
}
Validate.validateNickname = validateNickname;

module.exports = Validate;
