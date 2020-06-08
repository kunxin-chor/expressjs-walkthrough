var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const uuid = require('uuid');
const hbs = require('hbs')
const mongoUtil = require('./mongoUtil');
const passport = require('./passport/setup')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// setup session
app.use(session({
  genid: function(req) {
    return uuid.v4();
  },
  secret:"LTAoQqlWhemBr1rTEc0f0s4POPEvLIFO",
  resave:false,
  saveUninitialized: true,
    store: new FileStore(),
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup passport
app.use(passport.initialize()); // American spelling!
app.use(passport.session());

// make sure to declare all routes in the callback
mongoUtil.connect(()=>{
    console.log("DB connected");
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
