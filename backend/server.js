const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./config/db");
const dummyData = require("./data/data");

const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");

const app = express();
db();
app.use(express.json());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  // res.send("Hello there!");
  res.json(dummyData);
});

//api endpoint for user routes
app.use("/api/user", userRouter);
//api endpoint for chat routes
app.use("/api/chat", chatRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to db");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
