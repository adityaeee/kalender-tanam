const express = require("express");
const router = express.Router();
const tanaman = require("../utils/tanaman");
const iklim = require("../utils/iklim");

/* GET home page. */
router.get("/", (req, res) => {
  plants = tanaman.loadPlants();

  res.render("daftarTanaman", {
    layout: "layouts/main-layouts",
    title: "Daftar Tanaman",
    plants,
  });
});

router.post("/", (req, res) => {
  tanaman.addPlant(req.body);
  req.flash("msg", "Data tanaman berhasil ditambahkan");
  res.redirect("/data/tanaman");
});

router.get("/tambahTanaman", (req, res) => {
  res.render("PDTambahTanaman", {
    layout: "layouts/main-layouts",
    title: "Tambah Tanaman",
  });
});

router.get("/:tanaman", (req, res) => {
  plant = tanaman.findPlant(req.params.tanaman);
  climates = iklim.loadClimates();
  konversi = iklim.konvert(plant);

  res.render("kalenderTanam", {
    layout: "layouts/main-layouts",
    title: "Kalender Tanam",
    plant,
    climates,
    konversi,
  });
});

router.get("/edit/:tanaman", (req, res) => {
  plant = tanaman.findPlant(req.params.tanaman);

  res.render("PDEditTanaman", {
    layout: "layouts/main-layouts",
    title: "Kalender Tanam",
    plant,
  });
});

module.exports = router;
