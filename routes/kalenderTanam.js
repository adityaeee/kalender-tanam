const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const { findPlant, addPlant, loadPlants, deletePlant, cekDuplikat, updatePlants } = require("../utils/tanaman");
const { loadClimates, konvert } = require("../utils/iklim");

/* GET home page. */
router.get("/", (req, res) => {
  plants = loadPlants();

  res.render("daftarTanaman", {
    layout: "layouts/main-layouts",
    title: "Daftar Tanaman",
    plants,
  });
});

router.post(
  "/",
  [
    body("tanaman").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Tanaman sudah ada");
      }
      return true;
    }),
    check("chBB", "Curah Hujan harus numerik").isNumeric(),
    check("chBB", "Curah Hujan harus numerik").isNumeric(),
    check("chBA", "Curah Hujan harus numerik").isNumeric(),
    check("suBB", "Suhu Udara harus numerik").isNumeric(),
    check("suBA", "Suhu Udara harus numerik").isNumeric(),
    check("masaTanam", "Masa Tanam harus numerik").isNumeric(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("PDTambahTanaman", {
        layout: "layouts/main-layouts",
        title: "Form Tambah Data Tanaman",
        errors: errors.array(),
      });
    } else {
      addPlant(req.body);
      req.flash("msg", "Data tanaman berhasil ditambahkan");
      res.redirect("/data/tanaman");
    }
  }
);

router.post(
  "/update",
  [
    body("tanaman").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value.toLowerCase() !== req.body.oldTanaman.toLowerCase() && duplikat) {
        throw new Error("Tanaman sudah ada");
      }
      return true;
    }),
    check("chBB", "Curah Hujan harus numerik").isNumeric(),
    check("chBB", "Curah Hujan harus numerik").isNumeric(),
    check("chBA", "Curah Hujan harus numerik").isNumeric(),
    check("suBB", "Suhu Udara harus numerik").isNumeric(),
    check("suBA", "Suhu Udara harus numerik").isNumeric(),
    check("masaTanam", "Masa Tanam harus numerik").isNumeric(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("PDEditTanaman", {
        layout: "layouts/main-layouts",
        title: "Form Ubah DataTanaman",
        errors: errors.array(),
        plant: req.body,
      });
    } else {
      updatePlants(req.body);
      req.flash("msg", "Data tanaman berhasil diubah");
      res.redirect("/data/tanaman");
    }
  }
);

router.get("/tambahTanaman", (req, res) => {
  res.render("PDTambahTanaman", {
    layout: "layouts/main-layouts",
    title: "Form Tambah Tanaman",
  });
});

router.get("/edit/:tanaman", (req, res) => {
  plant = findPlant(req.params.tanaman);

  res.render("PDEditTanaman", {
    layout: "layouts/main-layouts",
    title: "Kalender Tanam",
    plant,
  });
});

router.get("/delete/:tanaman", (req, res) => {
  const plant = findPlant(req.params.tanaman);

  if (!plant) {
    res.send("<h1>404</h1>").status(404);
  } else {
    deletePlant(req.params.tanaman);
    req.flash("msg", "Data tanaman berhasil dihapus");
    res.redirect("/data/tanaman");
  }
});

router.get("/edit/:tanaman", (req, res) => {
  const plant = findPlant(req.params.tanaman);

  res.render("PDUbahTanaman", {
    layout: "layouts/main-layouts",
    title: "Ubah Tanaman",
    plant,
  });
});

router.get("/:tanaman", (req, res) => {
  plant = findPlant(req.params.tanaman);
  climates = loadClimates();
  konversi = konvert(plant);

  res.render("kalenderTanam", {
    layout: "layouts/main-layouts",
    title: "Kalender Tanam",
    plant,
    climates,
    konversi,
  });
});

module.exports = router;
