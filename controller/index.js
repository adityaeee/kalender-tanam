const Climate = require("../model/climate");

const convert = async (plant) => {
  climates = await Climate.find();
  const penyesuaian = [];
  climates.forEach((climate) => {
    if (climate.curahHujan < plant.chBB) {
      penyesuaian.push("0");
    } else if (climate.curahHujan > plant.chBA) {
      penyesuaian.push("0");
    } else if (climate.suhuUdara < plant.suBB) {
      penyesuaian.push("0");
    } else if (climate.suhuUdara > plant.suBA) {
      penyesuaian.push("0");
    } else {
      penyesuaian.push("1");
    }
  });

  return penyesuaian;
};

const dataFlow = function (data, result) {
  if (typeof result == "undefined") {
    return data;
  } else {
    data.shift();
    data.push(result);

    return data;
  }
};

const t = 0.8;
const a = 1.5;
const b = 455;

const normalisasi = (result) => {
  const x = (t * (result - a)) / (b - a) + 0.1;
  return x;
};

const denormalisasi = (result) => {
  const x = ((result - 0.1) * (b - a)) / t + a;
  return x;
};

// const norm = normalisasi(104.7);
// const den = denormalisasi(norm);

// console.log(norm);
// console.log(den);

// buah = "jeruk";
// arr = ["melon", "semangka", "pisang", "nangka"];
// arr.shift();
// arr.push(buah);

module.exports = { convert, dataFlow, normalisasi, denormalisasi };
