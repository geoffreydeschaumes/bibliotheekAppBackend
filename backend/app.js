let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let passport = require('passport');
let mongoose = require('mongoose');

mongoose.connect( process.env.RECIPE_DATABASE || 'mongodb://localhost/bib');
require('./models/Boek');
require('./models/User');
require('./models/Winkelwagentje');
require('./config/paswoord');
let index = require('./routes/index');
let users = require('./routes/users');
let winkelwagen = require('./routes/winkelwagentje');


let app = express();
let cors = require('cors');
app.use(cors({origin: '*'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


app.use('/API', index);
app.use('/API/users', users);
app.use('/API/winkelwagen', winkelwagen);
app.use(express.static(__dirname + '/dist'));
                    
                    app.all('*', (req, res) => {
                      const indexFile = `${path.join(__dirname, 'dist')}/index.html`;
                      res.status(200).sendFile(indexFile);
                    }); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

app.use(passport.initialize());
/*
app.use(function(req, res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accpet");
  next();
});
*/

module.exports = app;
