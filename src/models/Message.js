const mongoose = require("mongoose");
const { enumMessenger } = require("../utils/enum");

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  senderId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  // text -> 0
  // image -> 1
  // file -> 2
  msgType: {
    type: Number,
    default: enumMessenger.msgType.text,
  },

  content: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
