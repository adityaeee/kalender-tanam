require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");

var indexRouter = require("./routes/index");
var kalenderTanamRouter = require("./routes/kalenderTanam");
var hasilPrediksiRouter = require("./routes/hasilPrediksi");
var pengelolaanDataRouter = require("./routes/pengelolaanData");
const exp = require("constants");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Built-in middelware
app.use(express.static("public"));

//menggunakan ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

//endpoint
app.use("/home", indexRouter);
app.use("/katam", kalenderTanamRouter);
app.use("/prediksi", hasilPrediksiRouter);
app.use("/data", pengelolaanDataRouter);

module.exports = app;
