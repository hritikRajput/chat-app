const Chat = require("../models/Chat");
const User = require("../models/User");
const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({
        error: "Missing userId in the request body",
      });
    }

    let existingChat = await Chat.findOne({
      isGroupChat: false,
      $and: [
        { participants: { $elemMatch: { $eq: req.user._id } } },
        { participants: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("participants", "-password")
      .populate("latestMessage");

    existingChat = await User.populate(existingChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }
    //if no existing chat, create a new chat
    const newChatData = {
      name: "sender",
      isGroupChat: false,
      participants: [req.user._id, userId],
    };
    const newChat = await Chat.create(newChatData);

    // Populate user data in the new chat and respond
    const populatedChat = await Chat.findOne(newChat).populate(
      "participants",
      "-password"
    );
    res.status(200).json(populatedChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while accessing chat",
      err,
    });
  }
};

const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("participants", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name pic email",
        },
      })
      .sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while fetching chats",
      err,
    });
  }
};

module.exports = { accessChat, fetchChats };
