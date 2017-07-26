var express = require('express');
var router = express.Router();
var passport = require('./passport');

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

router.get('/test', function(req, res, next) {
    return res.render('test');
});

module.exports = router;
