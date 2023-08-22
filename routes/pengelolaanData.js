const express = require("express");
const router = express.Router();
const Plant = require("../model/plant");
const Climate = require("../model/climate");
const { dataLayout } = require("../utils/template");
// const tanaman = require("../utils/tanaman");

router.get("/", function (req, res, next) {
  res.render("menuPengelolaanData", dataLayout(req,  {
    title: "Pengelolaan Data",
  }));
});

router.get("/tanaman", async function (req, res) {
  plants = await Plant.find();

  res.render("PDTanaman", dataLayout(req, {
    title: "Pengelolaan Data Tanaman",
    plants,
  }));
});

router.get("/iklim", async function (req, res, next) {
  climates = await Climate.find();

  res.render("PDIklim", dataLayout(req, {
    title: "Pengelolaan Data Iklim",
    climates,
  }));
});

module.exports = router;
