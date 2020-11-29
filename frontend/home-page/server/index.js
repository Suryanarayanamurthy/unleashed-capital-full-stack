var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { BUILD_DIR, PUBLIC_DIR } = require('./paths');
const fs = require('fs')


var apiGateway = require('./routes/api-gateway.js');

////
const app = express();
////
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(PUBLIC_DIR));

app.use(express.static(BUILD_DIR));

app.use('/api/v1', apiGateway);

//remove below route for production.
app.get('/robots.txt',function(req,res,next){
  res.sendFile(PUBLIC_DIR+"/robots.txt");
});

app.get('/404',function(req,res,next){
  console.log("----- 404 -----")
  res.status(404).sendFile(BUILD_DIR+"/index.html");
  //next();
});

app.get('/*',function(req,res,next){
  console.log("-----home page BE on route '/*' -----")
  res.sendFile(BUILD_DIR+"/index.html");
  ////next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  //res.status(404).sendFile(BUILD_DIR+"/404/index.html");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  throw err;
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server up and running on port ${port} !`);
});

  