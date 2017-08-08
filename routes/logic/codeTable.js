var express = require('express');
var router = express.Router();

var Table = {};

Table.Univ = {
    1: "Korea",
    2: "Kyungpook",
}

Table.Major = {
    1: "ComputerScience",
    2: "Art",
    3: "Etc",
}

Table.Category = {
    1: "Capston",
    2: "Fashion & Beauty",
    3: "Design",
    4: "Art",
}

router.get('/univcode', function(req, res, next){
    res.json(Table.Univ);
});
router.get('/majorcode', function(req, res, next){
    res.json(Table.Major);
});
router.get('/categoryCode', function(req, res, next){
    res.json(Table.Category);
});

module.exports = router;
