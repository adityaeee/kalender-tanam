const mongoose = require("mongoose");

const Climate = mongoose.model("Climate", {
  bulan: {
    type: String,
    required: true,
  },
  curahHujan: {
    type: String,
    required: true,
  },
  suhuUdara: {
    type: String,
    required: true,
  },
});

const climate1 = new Climate({
  bulan: "Januari",
  curahHujan: "250",
  suhuUdara: "26",
});

climate1.save();

module.exports = Climate;
