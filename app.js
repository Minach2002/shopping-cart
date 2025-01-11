var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var { engine } = require('express-handlebars');

var app = express();
const fileUpload = require('express-fileupload');
var db = require('./config/connection');

// View engine setup
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layout',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


// Connect to the database a10nd start the server once the connection is successful
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err); // Detailed error logging
    process.exit(1); // Stop the server if DB connection fails
  } else {
    console.log("Database connected successfully");

    // Start the express server only after the DB connection is established
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  }
});

// Routes

app.use('/', userRouter);

app.use('/admin', adminRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
