var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoUtil = require("./mongoUtil.js");
const cors = require('cors');
var app = express()

// Connect to Mongo, then contiune the rest of the Express app
mongoUtil.connect((err, client) => {
  console.log("DB connected");
  var indexRouter = require("./routes/index");
  var usersRouter = require("./routes/users");

  app.use(cors())
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/", indexRouter);
  app.use("/users", usersRouter);

  app.use(express.static(path.join(__dirname, "public")));
});

module.exports = app;
