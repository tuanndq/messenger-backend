const mongoose = require("mongoose");
const enumMessenger = require("../utils/enum");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.index({ content: 'text' });

module.exports = mongoose.model("Message", MessageSchema);
