const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("home", {
    layout: "layouts/main-layouts",
    title: "KaLEnDeR TaNAm || Home",
    tahun: process.env.TAHUN,
    msg: req.flash("msg"),
  });
});

module.exports = router;
