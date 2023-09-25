const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./config/db");
const cors = require("cors");
// socket.io
const http = require("http");
const socketIo = require("socket.io");

const dummyData = require("./data/data");
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");

const app = express();
db();
app.use(express.json());
app.use(cors());

//create socket server
const server = http.createServer(app);
const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://127.0.0.1:5173", // Remove the trailing slash
    credentials: true,
  },
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  // res.send("Hello there!");
  res.json(dummyData);
});

//api endpoint for user routes
app.use("/api/user", userRouter);
//api endpoint for chat routes
app.use("/api/chat", chatRouter);
//api endpoint for message routes
app.use("/api/message", messageRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to db");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Move the "connection" event handler inside this callback
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
  // when the client sends a "join chat" event with a room name, make the socket join the specified chat room
  socket.on("join room", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat.participants) {
      console.log("chat.participants is not defined");
      return;
    }
    chat.participants.forEach((participant) => {
      if (participant._id === newMessageReceived.sender._id) return;
      socket.in(participant._id).emit("message received", newMessageReceived);
    });
  });
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
