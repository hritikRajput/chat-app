const mongoose = require("mongoose");
const User = require("./User");
const Message = require("./Message");
const Schema = mongoose.Schema;
const chatSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
    latestMessage: [
      {
        type: Schema.Types.ObjectId,
        ref: Message,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
