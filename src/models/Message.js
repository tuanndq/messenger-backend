const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
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
    default: 0,
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

module.exports = mongoose.model("Message", msgSchema);
