const fs = require("fs");
const { findTanaman } = require("../utils/tanaman");
const expressEjsLayouts = require("express-ejs-layouts");

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}
if (!fs.existsSync("./data/climates.json")) {
  fs.writeFileSync("./data/climates.json", "[]", "utf-8");
}

const loadClimates = () => {
  const file = fs.readFileSync("data/climates.json", "utf8");
  const climates = JSON.parse(file);
  return climates;
};

const konvert = (plant) => {
  climates = loadClimates();
  const penyesuaian = [];
  climates.forEach((climate) => {
    if (climate.curahHujan <= plant.chBB) {
      penyesuaian.push("0");
    } else if (climate.curahHujan >= plant.chBA) {
      penyesuaian.push("0");
    } else if (climate.suhuUdara <= plant.suBB) {
      penyesuaian.push("0");
    } else if (climate.suhuUdara >= plant.suBA) {
      penyesuaian.push("0");
    } else {
      penyesuaian.push("1");
    }
  });

  return penyesuaian;
};

module.exports = { loadClimates, konvert };
