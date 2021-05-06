const createError = require('http-errors');
const express = require('express');
const json = require('express').json;
const urlencoded = require('express').urlencoded;
const static = require('express').static;
const join = require('path').join;
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const editRouter = require('./routes/edit');
const Users = require('./models/users');
var cors= require('cors');
const url = 'mongodb://localhost:27017/phoneDirectory';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/edit',editRouter);

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(static(join(__dirname, 'public')));


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
  res.send('error');
});

module.exports =app;
