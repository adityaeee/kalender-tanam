const mongoose = require("mongoose");
// mongoose.connect(`mongodb://127.0.0.1:27017/KATAM`);
const Climate = mongoose.model("Climate", {
  bulan: {
    type: String,
    required: true,
  },
  curahHujan: {
    type: Number,
    required: true,
  },
  suhuUdara: {
    type: Number,
    required: true,
  },
});

// const climate1 = new Climate({
//   bulan: "Desember",
//   curahHujan: 250,
//   suhuUdara: 26,
// });
// climate1.save();
// console.log("ggwp")

module.exports = Climate;
