const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./config/db");

const app = express();
db();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello there!");
});

mongoose.connection.once("open", () => {
  console.log("Connected to db");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
