var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;

var routes = require('./routes/index');
var trainers = require('./routes/trainers');
var pokemon = require('./routes/pokemon');
var gym = require('./routes/gym');

var app = express();
var expressLayouts = require('express-ejs-layouts');

// session to app
require('./config/session.js')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/trainers', trainers);
app.use('/pokemon', pokemon);
app.use('/gym', gym);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, () => console.log('Heard on port ', port));

module.exports = app;
