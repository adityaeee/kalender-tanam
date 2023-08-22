const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const Climate = require("../model/climate");
const { default: axios } = require("axios");
const { dataFlow, normalisasi, denormalisasi, pembulatan } = require("../controller/index");
const { dataLayout } = require("../utils/template");

router.get("/", async (req, res) => {
  res.render("prediksi", dataLayout(req, {
    title: "Prediksi",
  }));
});

router.get("/curahHujan", async (req, res) => {
  res.render("prediksiCH", dataLayout(req, {
    title: "Prediksi",
  }));
});

router.post(
  "/curahHujan",
  [
    check("X1", "Nilai X1 harus numerik").isNumeric(),
    check("X2", "Nilai X2 harus numerik").isNumeric(),
    check("X3", "Nilai X3 harus numerik").isNumeric(),
    check("X4", "Nilai X4 harus numerik").isNumeric(),
    check("X5", "Nilai X5 harus numerik").isNumeric(),
    check("X6", "Nilai X6 harus numerik").isNumeric(),
    check("X7", "Nilai X7 harus numerik").isNumeric(),
    check("X8", "Nilai X8 harus numerik").isNumeric(),
    check("X9", "Nilai X9 harus numerik").isNumeric(),
    check("X10", "Nilai X10 harus numerik").isNumeric(),
    check("X11", "Nilai X11 harus numerik").isNumeric(),
    check("X12", "Nilai X12 harus numerik").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("prediksiCH", dataLayout(req, {
        title: "Prediksi",
        errors: errors.array(),
      }));
    } else {
      try {
        let result;
        const hasil = [];
        const value = [];

        value.push(normalisasi(parseFloat(req.body.X1)));
        value.push(normalisasi(parseFloat(req.body.X2)));
        value.push(normalisasi(parseFloat(req.body.X3)));
        value.push(normalisasi(parseFloat(req.body.X4)));
        value.push(normalisasi(parseFloat(req.body.X5)));
        value.push(normalisasi(parseFloat(req.body.X6)));
        value.push(normalisasi(parseFloat(req.body.X7)));
        value.push(normalisasi(parseFloat(req.body.X8)));
        value.push(normalisasi(parseFloat(req.body.X9)));
        value.push(normalisasi(parseFloat(req.body.X10)));
        value.push(normalisasi(parseFloat(req.body.X11)));
        value.push(normalisasi(parseFloat(req.body.X12)));

        for (let i = 0; i < 12; i++) {
          const data = {
            data: dataFlow(value, result),
          };

          const predict = await axios.post("http://127.0.0.1:5000/predict/ch", data);
          result = predict.data.res[0][0];
          hasil.push(denormalisasi(result));
        }

        for (var i = 0; i < hasil.length; i++) {
          hasil[i] = pembulatan(hasil[i])
        }

        res.render("prediksiCHresult", dataLayout(req, {
          title: "Hasil Prediksi curah hujan",
          value,
          hasil,
        }));
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  }
);

router.put("/curahHujan", async (req, res) => {
  const climates = await Climate.find();

  let value = [];
  value.push(req.body.X1);
  value.push(req.body.X2);
  value.push(req.body.X3);
  value.push(req.body.X4);
  value.push(req.body.X5);
  value.push(req.body.X6);
  value.push(req.body.X7);
  value.push(req.body.X8);
  value.push(req.body.X9);
  value.push(req.body.X10);
  value.push(req.body.X11);
  value.push(req.body.X12);

  climates.forEach(async (climate, i) => {
    await Climate.updateOne(
      { bulan: climate.bulan },
      {
        $set: {
          curahHujan: value[i],
        },
      }
    );
  });

  req.flash("msg", `Data iklim Curah hujan 1 tahun berhasil diperbarui berdasarkan hasil prediksi`);
  res.redirect("/data/iklim");
});

router.get("/suhuUdara", async function (req, res) {
  res.render("prediksiSU", dataLayout(req, {
    title: "Prediksi",
  }));
});

router.post(
  "/suhuUdara",
  [
    check("X1", "Nilai X1 harus numerik").isNumeric(),
    check("X2", "Nilai X2 harus numerik").isNumeric(),
    check("X3", "Nilai X3 harus numerik").isNumeric(),
    check("X4", "Nilai X4 harus numerik").isNumeric(),
    check("X5", "Nilai X5 harus numerik").isNumeric(),
    check("X6", "Nilai X6 harus numerik").isNumeric(),
    check("X7", "Nilai X7 harus numerik").isNumeric(),
    check("X8", "Nilai X8 harus numerik").isNumeric(),
    check("X9", "Nilai X9 harus numerik").isNumeric(),
    check("X10", "Nilai X10 harus numerik").isNumeric(),
    check("X11", "Nilai X11 harus numerik").isNumeric(),
    check("X12", "Nilai X12 harus numerik").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("prediksiSU", dataLayout(req, {
        title: "Prediksi",
        errors: errors.array(),
      }));
    } else {
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

        for (var i = 0; i < hasil.length; i++) {
          hasil[i] = pembulatan(hasil[i])
        }
        // console.log(hasil.length);
        // console.log(hasil);

        // const climates = await Climate.find();

        res.render("prediksiSUresult", dataLayout(req, {
          title: "Hasil Prediksi suhu udara",
          value,
          hasil,
        }));
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  }
);

router.put("/suhuUdara", async (req, res) => {
  const climates = await Climate.find();

  let value = [];
  value.push(req.body.X1);
  value.push(req.body.X2);
  value.push(req.body.X3);
  value.push(req.body.X4);
  value.push(req.body.X5);
  value.push(req.body.X6);
  value.push(req.body.X7);
  value.push(req.body.X8);
  value.push(req.body.X9);
  value.push(req.body.X10);
  value.push(req.body.X11);
  value.push(req.body.X12);

  //   console.log(value)

  climates.forEach(async (climate, i) => {
    await Climate.updateOne(
      { bulan: climate.bulan },
      {
        $set: {
          suhuUdara: value[i],
        },
      }
    );
  });

  req.flash("msg", `Data iklim Suhu udara 1 tahun berhasil diperbarui berdasarkan hasil prediksi`);
  res.redirect("/data/iklim");
});

module.exports = router;
