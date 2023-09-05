const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./config/db");

const userRouter = require("./routes/userRoutes");

const app = express();
db();
app.use(express.json());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.use("/api/user", userRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to db");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
