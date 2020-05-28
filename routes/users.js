var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id:1, user_name:'Anish'},
    {id:2, user_name:'Amit'}
  ]);
});

module.exports = router;
