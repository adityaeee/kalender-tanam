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

// const loadClimates = () => {
//   const file = fs.readFileSync("data/climates.json", "utf8");
//   const climates = JSON.parse(file);
//   return climates;
// };

module.exports = { convert };
