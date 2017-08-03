var crypto = require('crypto');
var hashsum = crypto.createHash('sha256');
var randonstring = require('randomstring');
const Round = 2029;

var Hash = {};

function myHash(plain, salt, cb){
    crypto.pbkdf2(plain, salt, Round, 512, 'sha512', cb);
}

Hash.pwHash = function(req, res, next){
    req.body.salt = randonstring.generate();
    myHash(req.body.pw, req.body.salt, (err, derivedKey) => {
        if (err){
            console.log(err);
            res.state(500).render('error');
        }else{
            req.body.pw = derivedKey.toString();
            next();
        }
    });
}

Hash.compareHashed = (hashed, plain, salt, cb)=>{
    myHash(plain, salt, (err, derivedKey) => {
        if (err){
            console.log(err);
            cb(false);
        }else if(hashed == derivedKey){
            cb(true);
        }else{
            cb(false);
        }
    });
}

module.exports = Hash;
