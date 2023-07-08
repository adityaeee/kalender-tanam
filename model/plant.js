const mongoose = require("mongoose");

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

module.exports = Plant;
