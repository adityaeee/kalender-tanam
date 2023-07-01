var express = require("express");
var router = express.Router();
const iklim = require("../utils/iklim");

router.get("/", function (req, res) {
  res.render("menuPrediksiIklim", {
    layout: "layouts/main-layouts",
    title: "Menu Prediksi Iklim",
    tahun: process.env.TAHUN,
  });
});

router.get("/curahHujan", function (req, res) {
  climates = iklim.loadIklim();
  tahun = process.env.TAHUN;
  res.render("hasilPrediksiCH", {
    layout: "layouts/main-layouts",
    title: "Hasil Prediksi",
    iklim,
    climates,
  });
});

module.exports = router;
