const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    const sender = req.user;
    if (!content || !chatId) {
      res.status(400).json({ error: "Invalid data passed into request" });
    }
    const newMessage = {
      sender,
      content,
      chat: chatId,
    };
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.participants",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while sending message",
      err,
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.find({
      chat: chatId,
    })
      .populate("sender", "name pic email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while sending message",
      err,
    });
  }
};

module.exports = { sendMessage, getAllMessages };
