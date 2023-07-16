const express = require("express");
const router = express.Router();
const Plant = require("../model/plant");
const Climate = require("../model/climate");
const { default: axios } = require("axios");
const { dataFlow } = require("../controller/index");
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

router.get("/prediksi", async (req, res) => {
  res.render("prediksi", {
    layout: "layouts/main-layouts",
    title: "Prediksi",
  });
});

router.get("/prediksi/suhuUdara", async function (req, res) {
  res.render("prediksiSU", {
    layout: "layouts/main-layouts",
    title: "Prediksi",
  });
});

router.post("/prediksi/suhuUdara", async (req, res) => {
  try {
    let result;
    const hasil = [];
    const value = [];

    value.push(parseFloat(req.body.X1));
    value.push(parseFloat(req.body.X2));
    value.push(parseFloat(req.body.X3));
    value.push(parseFloat(req.body.X4));
    value.push(parseFloat(req.body.X5));
    value.push(parseFloat(req.body.X6));
    value.push(parseFloat(req.body.X7));
    value.push(parseFloat(req.body.X8));
    value.push(parseFloat(req.body.X9));
    value.push(parseFloat(req.body.X10));
    value.push(parseFloat(req.body.X11));
    value.push(parseFloat(req.body.X12));

    for (let i = 0; i < 12; i++) {
      const data = {
        data: dataFlow(value, result),
      };

      const predict = await axios.post("http://127.0.0.1:5000/predict/su", data);
      result = predict.data.res[0][0];
      hasil.push(result);

      // console.log(data);
    }
    // console.log(hasil.length);
    console.log(hasil);

    res.render("prediksiSUresult", {
      layout: "layouts/main-layouts",
      title: "Hasil Prediksi",
      value,
      hasil,
    });
  } catch (error) {
    console.log("ERROR", error);
  }
});

module.exports = router;
