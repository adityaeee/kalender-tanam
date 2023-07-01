var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("home", {
    layout: "layouts/main-layouts",
    title: "Kalender Tanam || Home",
    tahun: process.env.TAHUN,
  });
});

module.exports = router;
