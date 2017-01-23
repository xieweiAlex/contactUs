/**
 * Created by Alex_Xie on 22/01/2017.
 */

var express = require('express');
var router = express.Router();

/* GET contact us listing. */
router.get('/', function(req, res, next) {
    var errorMsg = req.query.error;
    
    var app = express();
    console.log(app.get('error'));

    console.log("error msg is:" + errorMsg);
    if (errorMsg != null && errorMsg.length > 0 ) {
        res.render('contactUs', {title: 'Contact us ', 'error': errorMsg});
        res.query = null;
    } else {
        res.render('contactUs', {title: 'Contact us ', 'error': ''});
    }

    res.render('contacUs', { csrfToken: req.csrfToken() });
});


module.exports = router;



