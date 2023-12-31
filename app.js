require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const indexRouter = require("./routes/index");
const kalenderTanamRouter = require("./routes/kalenderTanam");
const hasilPrediksiRouter = require("./routes/hasilPrediksi");
const pengelolaanDataRouter = require("./routes/pengelolaanData");
const authRouter = require("./routes/auth");
const checkRouter = require("./routes/check");
const prediksiRouter = require("./routes/prediksi");

//panggil mongoose
require("./utils/db");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//configurasi flash
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//Built-in middelware
app.use(express.static("public"));

//method override
app.use(methodOverride("_method"));

//menggunakan ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

//endpoint
app.use("/home", indexRouter);
app.use("/katam", kalenderTanamRouter);
app.use("/hasil", hasilPrediksiRouter);
app.use("/data", pengelolaanDataRouter);
app.use("/auth", authRouter);
app.use("/check", checkRouter);
app.use("/prediksi", prediksiRouter);

module.exports = app;
