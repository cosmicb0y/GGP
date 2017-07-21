var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Session, Passport test!!
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
//

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session, Passport test!!
app.use(session({ secret: 'SessionTest!!'
    , resave: true
    , saveUninitialized: false 
    , cookie: {secure: false, maxAge: 1000*60} }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done){
    console.log('serialize');
    done(null, user);
});
passport.deserializeUser(function(user, done){
    console.log('deserialize');
    done(null, user);
});
passport.use(new localStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    passReqToCallback : true
    },
    function(req, id, pw, done) {
        if (id === 'test@test.com' && pw === 'test') {
            var user = {id: 'userJang!!', nickname: 'test~'};
            return done(null, user);
        }else{
            return done(null, false, { message: 'Fail to login.' });
        }
    }));
//

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
