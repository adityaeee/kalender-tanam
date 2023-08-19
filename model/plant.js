const mongoose = require("mongoose");
// mongoose.connect(`mongodb://127.0.0.1:27017/KATAM`);

const Plant = mongoose.model("Plant", {
  tanaman: {
    type: String,
    required: true,
  },
  ilmiah: {
    type: String,
    required: true,
  },
  chBB: {
    type: Number,
    required: true,
  },
  chBA: {
    type: Number,
    required: true,
  },
  suBB: {
    type: Number,
    required: true,
  },
  suBA: {
    type: Number,
    required: true,
  },
  masaTanam: {
    type: Number,
    required: true,
  },
});

// const plant = new Plant({
//   tanaman: "Padi",
//   ilmiah:'Oryza sativa',
//   chBB: 150,
//   chBA: 500,
//   suBB: 24,
//   suBA: 29,
//   masaTanam:4 
// });
// plant.save();
// console.log("ggwp")

module.exports = Plant;
