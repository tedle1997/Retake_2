/**
 * Web Atelier 2020  Exercise 7 - Single-Page Web Applications with Fetch and Client-side Views
 *
 * Student: __STUDENT NAME__
 *
 * Main Server Application
 *
 * version 852 Fri Oct 30 2020 12:30:55 GMT+0100 (Central European Standard Time)
 *
 */

//require framework and middleware dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

const fs = require('fs-extra');



//init framework
const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, safeFileNames: true, preserveExtension: 4, debug: false
  }));
app.use(express.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(express.json({limit: '4MB'}));    // parse application/json
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');


//controllers
const routers = require('./routes');

app.use('/timer', routers.timer);

//default fallback handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  //if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    });
  //}

  // production error handler
  // no stacktraces leaked to user
  // app.use(function(err, req, res, next) {
  //   res.status(err.status || 500);
  //   res.json({
  //     message: err.message,
  //     error: {}
  //   });
  // });



//start server
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

let ws = require("./ws");
ws.init(server);