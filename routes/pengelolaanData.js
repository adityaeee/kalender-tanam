const express = require("express");
const router = express.Router();
const Plant = require("../model/plant");
const Climate = require("../model/climate");
// const tanaman = require("../utils/tanaman");

router.get("/", function (req, res, next) {
  res.render("menuPengelolaanData", {
    layout: "layouts/main-layouts",
    title: "Pengelolaan Data",
  });
});

router.get("/tanaman", async function (req, res) {
  plants = await Plant.find();

  res.render("PDTanaman", {
    layout: "layouts/main-layouts",
    title: "Pengelolaan Data Tanaman",
    plants,
    msg: req.flash("msg"),
  });
});

router.get("/iklim", async function (req, res, next) {
  climates = await Climate.find();

  res.render("PDIklim", {
    layout: "layouts/main-layouts",
    title: "Pengelolaan Data Iklim",
    climates,
    msg: req.flash("msg"),
  });
});

router.get("/prediksi", function (req, res, next) {
  res.render("prediksi", {
    layout: "layouts/main-layouts",
    title: "Prediksi",
  });
});

module.exports = router;
