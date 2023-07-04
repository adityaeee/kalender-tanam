const fs = require("fs");

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}
if (!fs.existsSync("./data/plants.json")) {
  fs.writeFileSync("./data/plants.json", "[]", "utf-8");
}

const loadPlants = () => {
  const file = fs.readFileSync("data/plants.json", "utf8");
  const plants = JSON.parse(file);
  return plants;
};

const findPlant = (tanaman) => {
  const plants = loadPlants();

  const plant = plants.find((plant) => plant.tanaman.toLowerCase() === tanaman.toLowerCase());
  return plant;
};

const savePlants = (plants) => {
  fs.writeFileSync("data/plants.json", JSON.stringify(plants));
};

const addPlant = (plant) => {
  const plants = loadPlants();
  plants.push(plant);
  savePlants(plants);
};

//   //   cek duplikat
//   const duplikat = plants.find((plant) => plant.tanaman === tanaman);
//   if (duplikat) {
//     console.log("Tanaman sudah terdaftar");
//     return false;
//   }

//   plants.push(plant);
//   fs.writeFileSync("data/plants.json", JSON.stringify(plants));
//   console.log("Berhasil");
// };

// const deleteTanaman = (tanaman) => {
//   const plants = loadTanaman();
//   const newPlants = plants.filter((plant) => plant.tanaman.toLowerCase() !== tanaman.toLowerCase());

//   if (plants.length === newPlants.length) {
//     console.log(`${tanaman} tidak ditemukan`);
//     return false;
//   }

//   fs.writeFileSync("data/plants.json", JSON.stringify(newPlants));
//   console.log(`${tanaman} berhasil di hapus`);
// };

module.exports = { loadPlants, findPlant, addPlant };
