const fs = require("fs");

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}
if (!fs.existsSync("./data/plants.json")) {
  fs.writeFileSync("./data/plants.json", "[]", "utf-8");
}

const loadTanaman = () => {
  const file = fs.readFileSync("data/plants.json", "utf8");
  const plants = JSON.parse(file);
  return plants;
};

const findTanaman = (tanaman) => {
  const plants = loadTanaman();

  const plant = plants.find((plant) => plant.tanaman.toLowerCase() === tanaman.toLowerCase());
  return plant;
};

const saveTanaman = (tanaman, ilmiah, chBB, chBA, suhuBB, suhuBA) => {
  const plant = { tanaman, ilmiah, chBB, chBA, suhuBB, suhuBA };
  const plants = loadTanaman();

  //   cek duplikat
  const duplikat = plants.find((plant) => plant.tanaman === tanaman);
  if (duplikat) {
    console.log("Tanaman sudah terdaftar");
    return false;
  }

  plants.push(plant);
  fs.writeFileSync("data/plants.json", JSON.stringify(plants));
  console.log("Berhasil");
};

const listTanaman = () => {
  const plants = loadTanaman();
  plants.forEach((plant, i) => {
    console.log(`${i + 1}. ${plant.tanaman}`);
  });
};

const detailTanaman = (tanaman) => {
  const plants = loadTanaman();

  const plant = plants.find((plant) => plant.tanaman.toLowerCase() === tanaman.toLowerCase());

  if (!plant) {
    console.log(`tanaman ${tanaman} tidak ditemukan`);
    return false;
  }

  // console.log(`${plant.tanaman} - ${plant.chBB} - ${plant.chBA} - ${plant.suhuBB} - ${plant.suhuBA}`);
};

const deleteTanaman = (tanaman) => {
  const plants = loadTanaman();
  const newPlants = plants.filter((plant) => plant.tanaman.toLowerCase() !== tanaman.toLowerCase());

  if (plants.length === newPlants.length) {
    console.log(`${tanaman} tidak ditemukan`);
    return false;
  }

  fs.writeFileSync("data/plants.json", JSON.stringify(newPlants));
  console.log(`${tanaman} berhasil di hapus`);
};

module.exports = { loadTanaman, saveTanaman, listTanaman, detailTanaman, deleteTanaman, findTanaman };
