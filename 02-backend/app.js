var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session')
const hbs = require('hbs')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const mongoUtil = require('./mongoUtil.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// get key from: https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
app.use(cookieSession({
    name:'session',
    keys:['mZq4t6w9z$C&F)J@NcRfUjXn2r5u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E(H+MbQe'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(require('flash')());

// register handlebars
hbs.registerHelper('display_flash', function(flash){
    let all = [];
    while (message = flash.shift()) {
        all.push(message.message);
    }
    return all;
})

mongoUtil.connect(()=>{
    console.log("DB connected");

    // important note, earlier one will take precedence!
    app.use('/', indexRouter);
    app.use('/users', usersRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
     next(createError(404));
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
})




module.exports = app;
