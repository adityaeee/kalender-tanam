const mongoose = require("mongoose");
// mongoose.connect(`mongodb://127.0.0.1:27017/KATAM`);

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// const user = new User({
//   username: "adminkatam2",
//   password: "Adminkatam2",
// });
// user.save();

module.exports = User;
