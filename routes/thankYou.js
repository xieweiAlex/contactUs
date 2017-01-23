/**
 * Created by Alex_Xie on 22/01/2017.
 */

var express = require('express');
var router = express.Router();

/* GET Thank you page listing. */
router.get('/', function(req, res, next) {

    var username = req.query.username;
    console.log('username is: ' + username);
    res.render('thankYou', { 'username': username });
});

module.exports = router;