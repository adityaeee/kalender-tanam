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

const savePlants = (plants) => {
  fs.writeFileSync("data/plants.json", JSON.stringify(plants));
};

const addPlant = (plant) => {
  plant.tanaman = plant.tanaman.toLowerCase();
  const plants = loadPlants();
  plants.push(plant);
  savePlants(plants);
};

const findPlant = (tanaman) => {
  const plants = loadPlants();

  const plant = plants.find((plant) => plant.tanaman.toLowerCase() === tanaman.toLowerCase());
  return plant;
};

const deletePlant = (tanaman) => {
  const plants = loadPlants();
  const filteredPlants = plants.filter((plant) => plant.tanaman.toLowerCase() !== tanaman.toLowerCase());

  savePlants(filteredPlants);
};

//   cek duplikat
const cekDuplikat = (tanaman) => {
  const plants = loadPlants();
  return plants.find((plant) => plant.tanaman.toLowerCase() === tanaman.toLowerCase());
};

const updatePlants = (newPlant) => {
  const plants = loadPlants();
  //hilangkan kontak nama yang tanaman sama dengan oldTanaman
  const filteredPlants = plants.filter((plant) => plant.tanaman.toLowerCase() !== newPlant.oldTanaman.toLowerCase());
  delete newPlant.oldTanaman;
  newPlant.tanaman = newPlant.tanaman.toLowerCase();
  filteredPlants.push(newPlant);
  savePlants(filteredPlants);
};

module.exports = { loadPlants, findPlant, addPlant, deletePlant, cekDuplikat, updatePlants };
