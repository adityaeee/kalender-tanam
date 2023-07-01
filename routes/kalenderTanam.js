var express = require("express");
var router = express.Router();
const tanaman = require("../utils/tanaman");
const iklim = require("../utils/iklim");

/* GET home page. */
router.get("/", function (req, res, next) {
  plants = tanaman.loadTanaman();

  res.render("daftarTanaman", {
    layout: "layouts/main-layouts",
    title: "Daftar Tanaman",
    plants,
  });
});

router.get("/:tanaman", function (req, res, next) {
  plant = tanaman.findTanaman(req.params.tanaman);
  climates = iklim.loadIklim();
  konversi = iklim.konversi(plant);

  res.render("kalenderTanam", {
    layout: "layouts/main-layouts",
    title: "Kalender Tanam",
    plant,
    climates,
    konversi,
  });
});

module.exports = router;
