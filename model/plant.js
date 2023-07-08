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
    type: String,
    required: true,
  },
  chBA: {
    type: String,
    required: true,
  },
  suBB: {
    type: String,
    required: true,
  },
  suBA: {
    type: String,
    required: true,
  },
  masaTanam: {
    type: String,
    required: true,
  },
});

module.exports = Plant;
