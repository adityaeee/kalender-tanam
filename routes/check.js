const express = require("express");
const router = express.Router();
const Climate = require("../model/climate");
const { convert } = require("../controller/index");

router.get("/", async (req, res) => {
  res.render("inputCheck", {
    layout: "layouts/main-layouts",
    title: "Check your plant",
  });
});

router.post("/", async (req, res) => {
  plant = req.body;

  climates = await Climate.find();
  konversi = await convert(plant);

  res.render("kalenderTanam", {
    layout: "layouts/main-layouts",
    title: "Kalender Tanam",
    plant,
    climates,
    konversi,
  });
});

module.exports = router;
