const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/KATAM`);

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

const user1 = new User({
  username: "Admin1",
  password: "Admin1",
});
user1.save();

const user2 = new User({
  username: "Admin2",
  password: "Admin2",
});
user2.save();

module.exports = User;
