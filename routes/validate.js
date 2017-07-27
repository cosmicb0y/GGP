var DB = require('./db');

var Validate = {};

Validate.validateRegForm = function(req, res, next){
    console.log(req.body)
    if( req.body.pw != req.body.pwConfirm
        || ! validatePW(req.body.pw)
        || ! validateCategory(req.body.category)
        || ! validateUniv(req.body.univ)
        || ! validateMajor(req.body.major) ){
        res.state(500).render('error');
    }
    DB.User.findOne({ $or: [ {email: req.body.email}, {nickname: req.body.nickname} ] }
        ,{_id: 0, email: 1, nickname: 1, password: 1}
        ,(err, exist)=>{
            if(err){
                console.err(err);
                res.state(500).render('error');
            }else if( exist ){
                res.state(500).render('error');
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
