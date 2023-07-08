const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const Climate = require("../model/climate");
// const iklim = require("../utils/iklim");

router.get("/", function (req, res) {
  res.render("menuPrediksiIklim", {
    layout: "layouts/main-layouts",
    title: "Menu Prediksi Iklim",
    tahun: process.env.TAHUN,
  });
});

router.get("/curahHujan", async function (req, res) {
  climates = await Climate.find();
  tahun = process.env.TAHUN;

  res.render("hasilPrediksiCH", {
    layout: "layouts/main-layouts",
    title: "Hasil Prediksi",
    climates,
  });
});

router.get("/suhuUdara", async function (req, res) {
  climates = await Climate.find();
  tahun = process.env.TAHUN;

  res.render("hasilPrediksiSU", {
    layout: "layouts/main-layouts",
    title: "Hasil Prediksi",
    climates,
  });
});

router.get("/edit/:_id", async (req, res) => {
  climate = await Climate.findOne({ _id: req.params._id });

  res.render("PDEditIklim", {
    layout: "layouts/main-layouts",
    title: "Edit Iklim",
    climate,
  });
});

router.put("/", [check("curahHujan", "Curah Hujan harus numerik").isNumeric(), check("suhuUdara", "Suhu Udara harus numerik").isNumeric()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("PDEditIklim", {
      layout: "layouts/main-layouts",
      title: "Form Ubah Data Iklim",
      errors: errors.array(),
      climate: req.body,
    });
  } else {
    await Climate.updateOne(
      { _id: req.body._id },
      {
        $set: {
          curahHujan: req.body.curahHujan,
          suhuUdara: req.body.suhuUdara,
        },
      }
    );
    req.flash("msg", `Data iklim bulan ${req.body.bulan} berhasil diubah`);
    res.redirect("/data/iklim");
  }
});

module.exports = router;
