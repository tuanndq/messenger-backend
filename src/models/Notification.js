const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  isRead: {
    type: Boolean,
    default: false,
  },

  senderId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  conversationId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
