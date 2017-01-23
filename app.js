var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var bodyParser = require('body-parser');

const fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');
var contactUs = require('./routes/contactUs');
var thankYou = require('./routes/thankYou');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// csrf
app.use(csrf({ cookie: true }));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    res.locals.csrftoken = req.csrfToken();
    res.cookie('XSRF-TOKEN', req.csrfToken());

    // res.cookie
    //res.render('send', { csrfToken: req.csrfToken() });

    next();
});

app.use('/', index);
app.use('/index', index);
app.use('/users', users);
app.use('/contactus', contactUs);
app.use('/thankyou', thankYou);


app.post('/contactus', function (req, res) {

    var name = req.body.full_name;
    const type = req.body.type;
    const message = req.body.message;

    if (name.length <= 0) {
        res.redirect('/contactus?error=' + 'name missing');
        return;
    }

    if (message.length <= 0) {
        res.redirect('/contactus?error=' + 'message missing');
        return;
    }

    var dic = {'name': name, 'type': type, 'message': message };
    const fileName = 'requet_body.txt';

    var jsonStr = JSON.stringify(dic);
    console.log('save to file: ' + jsonStr);

    fs.writeFile(path.join(__dirname, fileName), jsonStr, function (err, data) {
        if (err) {
            throw err;
        }
        res.redirect('/thankYou?username=' + name);
    });
});

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

module.exports = app.listen('2222');



