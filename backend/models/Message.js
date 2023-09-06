const mongoose = require("mongoose");
const User = require("./User");
const Chat = require("./Chat");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    content: {
      type: String,
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Chat",
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
