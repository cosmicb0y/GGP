var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var DB = require('./db');

passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(user, done){
    done(null, user);
});
passport.use('login', new localStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    passReqToCallback : true
    },
    function(req, id, pw, done) {
        DB.User.findOne({email: req.body.id}, {_id: 0, password: 1}, (err, user) => {
            if(err){
                return done(null, false, { message: 'DB Error!'});
            }
            if(user == null){
                return done(null, false, { message: 'No user with id!'});
            }
            if(user.pwCheck(pw)){
                return done(null, user);
            }else{
                return done(null, false, { message: 'PW not match!'});
            }
        })
    }
));

module.exports = passport;
