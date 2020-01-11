var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var ip = require("ip");
var db = require("./models/db");

var config = require("./config/config");
var router = require('./routes/index');

var app = express();

var PORT = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // cors header
    if(req.method == "OPTIONS"){
            // In very simple terms, this is how you handle OPTIONS request in nodejs
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, HEAD");
            res.header('Access-Control-Max-Age', '1728000');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,Authorization, X-AUTH-TOKEN");
            res.header("Content-Length", "0");
            res.sendStatus(208);
    }
    else{
        next();
    }
});

// ===================
// database config
// ===================

db.public.sequelize
    .authenticate()
    .then(() => {
      console.log('==================');
      console.log('Database Connected');
      console.log('==================');
    })
    .catch(err => {
      console.log('=========================================');
      console.error('Unable to connect to the database:', err);
      console.log('=========================================');
    });


app.get("/", function(req, res){
  console.log("Welcome to the app");
  res.status(200).json({
    success: true,
    message: "Welcome to generic API"
  });
});

app.use('/api/v1', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // console.log(err);
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  if (err.status != 404) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  } else if(err.status == 404){
    res.status(404).json({
      success: false,
      status: 404,
      message: 'Endpoint not found'
    });
  } else {
    res.status(200).json({success: true, message: "Welcome to the api. Please register yourself to get an access token."});
  }
});

var ip_address = ip.address();
app.listen(PORT, () => console.log(`APIs are Running\t on http://${ip_address}:${PORT}/`));