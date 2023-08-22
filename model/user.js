const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/KATAM`);

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  levelUser: {
    type: String,
    required: true,
  },
});

// const user1 = new User({
//   name: "Aditya",
//   username: "Petugas",
//   password: "12345",
//   levelUser: "petugas",
// });
// user1.save();

module.exports = User;
