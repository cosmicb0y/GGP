var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("/users!!");
    res.send('respond with a resource. this is /users');
});

module.exports = router;
