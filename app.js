const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const indexRouter = require('./routes/index');
const logoutRouter = require('./routes/logout');
const signUpRouter = require('./routes/signup');
const topicRouter = require('./routes/topic');
const internalLoginRouter = require('./routes/internal/login-form');
const internalSignUpRouter = require('./routes/internal/create-account-form');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: 'strict'
}));

// routers
app.use('/', indexRouter);
app.use('/', logoutRouter);
app.use('/', signUpRouter);
app.use('/', topicRouter);
// internal routes
app.use('/', internalLoginRouter);
app.use('/', internalSignUpRouter);

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

module.exports = app;
