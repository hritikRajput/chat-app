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

const createGroupChat = async (req, res) => {
  try {
    const participants = JSON.parse(req.body.users);
    const name = req.body.name;
    if (!participants || !name) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }
    if (participants.length < 2) {
      return res.status(400).json({
        error: "At least 2 users are required to create a group chat",
      });
    }
    participants.push(req.user);
    const groupChat = await Chat.create({
      name: req.body.name,
      participants: participants,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.find({
      _id: groupChat._id,
    })
      .populate("participants", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while creating new group",
      err,
    });
  }
};

const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        name: chatName,
      },
      { new: true }
    )
      .populate("participants", "-password")
      .populate("groupAdmin", "-password");

    updatedChat
      ? res.status(200).json(updatedChat)
      : res.status(404).json("Chat not found");
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while renaming group",
      err,
    });
  }
};

const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const groupModified = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { participants: userId },
      },
      { new: true }
    )
      .populate("participants", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(groupModified);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while adding to group",
      err,
    });
  }
};

const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const groupModified = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { participants: userId },
      },
      { new: true }
    )
      .populate("participants", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(groupModified);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while removing from group",
      err,
    });
  }
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
