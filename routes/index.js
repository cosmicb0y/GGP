var express = require('express');
var router = express.Router();
var Passport = require('./logic/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
        res.render('contents');
    } else {
        res.render('index', { title: 'Express' });
    }
});

router.get('/login', function(req, res, next) {
    return res.render('login');
});

router.get('/upload', function(req, res, next) {
    return res.render('upload');
});

router.get('/test', function(req, res, next) {
    return res.render('test');
});

router.get('/tmpcomment', function(req, res, next) {
    return res.render('tmpcomment');
});

module.exports = router;
