const mongoose = require("mongoose");

module.exports.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(" Database connected");
  } catch (err) {
    console.error(" DB connection error:", err.message);
    process.exit(1);
  }
};
