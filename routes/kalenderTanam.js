const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const { convert } = require("../utils/iklim");
// const tanaman = require("../utils/tanaman");
const Plant = require("../model/plant");
const Climate = require("../model/climate");

/* GET home page. */
router.get("/", async (req, res) => {
  plants = await Plant.find();

  res.render("daftarTanaman", {
    layout: "layouts/main-layouts",
    title: "Daftar Tanaman",
    plants,
  });
});

router.get("/tambahTanaman", (req, res) => {
  res.render("PDTambahTanaman", {
    layout: "layouts/main-layouts",
    title: "Form Tambah Tanaman",
  });
});

router.post(
  "/",
  [
    body("tanaman").custom(async (value) => {
      const duplikat = await Plant.findOne({ tanaman: value });
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
      res.render("PDTambahTanaman", {
        layout: "layouts/main-layouts",
        title: "Form Tambah Data Tanaman",
        errors: errors.array(),
      });
    } else {
      // req.body.tanaman = req.body.tanaman.toLowerCase();
      Plant.insertMany(req.body);
      req.flash("msg", `Data tanaman ${req.body.tanaman} berhasil ditambahkan`);
      res.redirect("/data/tanaman");
    }
  }
);

router.get("/edit/:_id", async (req, res) => {
  plant = await Plant.findOne({ _id: req.params._id });
  res.render("PDEditTanaman", {
    layout: "layouts/main-layouts",
    title: "Kalender Tanam",
    plant,
  });
});

router.put(
  "/",
  [
    body("tanaman").custom(async (value, { req }) => {
      const duplikat = await Plant.findOne({ tanaman: value });
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("PDEditTanaman", {
        layout: "layouts/main-layouts",
        title: "Form Ubah DataTanaman",
        errors: errors.array(),
        plant: req.body,
      });
    } else {
      await Plant.updateOne(
        { _id: req.body._id },
        {
          $set: {
            tanaman: req.body.tanaman,
            ilmiah: req.body.ilmiah,
            chBB: req.body.chBB,
            chBA: req.body.chBA,
            suBB: req.body.suBB,
            suBA: req.body.suBA,
            masaTanam: req.body.masaTanam,
          },
        }
      );
      req.flash("msg", `Data tanaman ${req.body.tanaman} berhasil diubah`);
      res.redirect("/data/tanaman");
    }
  }
);

router.delete("/", async (req, res) => {
  await Plant.deleteOne({ _id: req.body._id });
  req.flash("msg", "Data tanaman berhasil dihapus");
  res.redirect("/data/tanaman");
});

//kalender tanam tiap tanaman
router.get("/:_id", async (req, res) => {
  plant = await Plant.findOne({ _id: req.params._id });

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
