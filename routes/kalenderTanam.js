const express = require("express");
const fs = require("fs");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const { convert } = require("../controller/index");
const Plant = require("../model/plant");
const Climate = require("../model/climate");
const { dataLayout } = require("../utils/template");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const unique = file.originalname.split(".");
    req.fileName = req.body.tanaman + "." + unique[unique.length - 1];

    if (req.body?.gambarLama) {
      fs.unlinkSync("./public/images/" + req.body?.gambarLama);
    }
    
    cb(null, req.fileName);
  },
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", async (req, res) => {
  plants = await Plant.find();

  res.render(
    "daftarTanaman",
    dataLayout(req, {
      title: "Daftar Tanaman",
      plants,
    })
  );
});

router.get("/tambahTanaman", (req, res) => {
  res.render(
    "PDTambahTanaman",
    dataLayout(req, {
      title: "Form Tambah Tanaman",
    })
  );
});

router.post(
  "/",
  upload.single("gambar"),
  [
    body("tanaman").custom(async (value) => {
      const duplikat = await Plant.findOne({ tanaman: value });
      if (duplikat) {
        throw new Error("Tanaman sudah ada");
      }
      return true;
    }),

    check("chBB", "Curah Hujan minimum harus numerik").isNumeric(),
    check("chBA", "Curah Hujan maksimmum harus numerik").isNumeric(),
    check("suBB", "Suhu Udara minimum harus numerik").isNumeric(),
    check("suBA", "Suhu Udara maskimum harus numerik").isNumeric(),
    check("masaTanam", "Masa Tanam harus numerik").isNumeric(),

    // body("chBB").custom((value, { req }) => {
    //   if (value >= req.body.chBA) {
    //     throw new Error("Curah Hujan Minimum harus lebih kecil dari Curah Hujan Maksimum");
    //   }
    //   return true;
    // }),

    body("suBB").custom((value, { req }) => {
      if (value >= req.body.suBA) {
        throw new Error(
          "Suhu Udara Minimum harus lebih kecil dari Suhu Udara Maksimum"
        );
      }
      return true;
    }),
  ],
  (req, res) => {
    req.filename;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render(
        "PDTambahTanaman",
        dataLayout(req, {
          title: "Form Tambah Data Tanaman",
          errors: errors.array(),
        })
      );
    } else {
      let data = { ...req.body, gambar: req.fileName };
      Plant.insertMany(data);
      req.flash("msg", `Data tanaman ${req.body.tanaman} berhasil ditambahkan`);
      res.redirect("/data/tanaman");
    }
  }
);

router.get("/edit/:_id", async (req, res) => {
  plant = await Plant.findOne({ _id: req.params._id });
  res.render(
    "PDEditTanaman",
    dataLayout(req, {
      title: "Kalender Tanam",
      plant,
    })
  );
});

router.put(
  "/",
  upload.single("gambar"),
  [
    body("tanaman").custom(async (value, { req }) => {
      const duplikat = await Plant.findOne({ tanaman: value });
      if (
        value.toLowerCase() !== req.body.oldTanaman.toLowerCase() &&
        duplikat
      ) {
        throw new Error("Tanaman sudah ada");
      }
      return true;
    }),
    check("chBB", "Curah Hujan harus numerik").isNumeric(),
    check("chBA", "Curah Hujan harus numerik").isNumeric(),
    check("suBB", "Suhu Udara harus numerik").isNumeric(),
    check("suBA", "Suhu Udara harus numerik").isNumeric(),
    check("masaTanam", "Masa Tanam harus numerik").isNumeric(),

    // body("chBB").custom((value, { req }) => {
    //   if (value >= req.body.chBA) {
    //     throw new Error("Curah Hujan Minimum harus lebih kecil dari Curah Hujan Maksimum");
    //   }
    //   return true;
    // }),

    body("suBB").custom((value, { req }) => {
      if (value >= req.body.suBA) {
        throw new Error(
          "Suhu Udara Minimum harus lebih kecil dari Suhu Udara Maksimum"
        );
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render(
        "PDEditTanaman",
        dataLayout(req, {
          title: "Form Ubah DataTanaman",
          errors: errors.array(),
          plant: req.body,
        })
      );
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
            gambar: req?.fileName || req.body.gambarLama
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

  res.render(
    "kalenderTanam",
    dataLayout(req, {
      title: "Kalender Tanam",
      plant,
      climates,
      konversi,
    })
  );
});

module.exports = router;
