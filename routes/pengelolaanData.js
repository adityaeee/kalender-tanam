const express = require("express");
const router = express.Router();
const tanaman = require("../utils/tanaman");

router.get("/", function (req, res, next) {
  res.render("menuPengelolaanData", {
    layout: "layouts/main-layouts",
    title: "Pengelolaan Data",
  });
});

router.get("/tanaman", function (req, res, next) {
  plants = tanaman.loadPlants();

  res.render("PDTanaman", {
    layout: "layouts/main-layouts",
    title: "Pengelolaan Data Tanaman",
    plants,
    msg: req.flash("msg"),
  });
});

router.get("/iklim", function (req, res, next) {
  res.render("PDIklim", {
    layout: "layouts/main-layouts",
    title: "Pengelolaan Data Iklim",
  });
});

router.get("/prediksi", function (req, res, next) {
  res.render("prediksi", {
    layout: "layouts/main-layouts",
    title: "Prediksi",
  });
});

module.exports = router;
