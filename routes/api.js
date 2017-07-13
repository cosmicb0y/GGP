var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource GET. this is /api');
});
router.post('/', function(req, res, next) {
    console.log(req.body[test]);
    res.send(req.body[test]);
});

module.exports = router;
