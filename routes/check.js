const express = require("express");
const router = express.Router();
const Climate = require("../model/climate");
const { convert } = require("../controller/index");
const { body, validationResult, check } = require("express-validator");
const { dataLayout } = require("../utils/template");

router.get("/", async (req, res) => {
  res.render("inputCheck", dataLayout(req, {
    title: "Check your plant",
  }));
});

router.post(
  "/",
  [
    body("chBB").custom((value, { req }) => {
      if (value >= req.body.chBA) {
        throw new Error("Curah Hujan Minimum harus lebih kecil dari Curah Hujan Maksimum");
      }
      return true;
    }),

    body("suBB").custom((value, { req }) => {
      if (value >= req.body.suBA) {
        throw new Error("Suhu Udara Minimum harus lebih kecil dari Suhu Udara Maksimum");
      }
      return true;
    }),

    check("chBB", "Curah Hujan harus numerik").isNumeric(),
    check("chBA", "Curah Hujan harus numerik").isNumeric(),
    check("suBB", "Suhu Udara harus numerik").isNumeric(),
    check("suBA", "Suhu Udara harus numerik").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("inputCheck", dataLayout(req, {
        title: "Check your plant",
        errors: errors.array(),
      }));
    } else {
      plant = req.body;

      climates = await Climate.find();
      konversi = await convert(plant);

      res.render("kalenderTanam", dataLayout(req, {
        title: "Check your plant",
        climates,
        konversi,
      }));
    }
  }
);

module.exports = router;
