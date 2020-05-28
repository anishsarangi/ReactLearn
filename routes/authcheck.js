var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
    var email = req.body.email
    var password = req.body.password
});