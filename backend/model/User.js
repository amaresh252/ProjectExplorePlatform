const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", user);
module.exports = User;
