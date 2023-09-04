const databaseURL = process.env.DATABASE_URL;
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL);
  } catch (err) {
    console.log("failed to connect to DB", err);
  }
};

module.exports = connectDB;
