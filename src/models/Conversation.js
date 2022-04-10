const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  modifiedDate: {
    type: Date,
    default: Date.now,
  },

  members: {
    // Array of Member-ID
    type: Array,
  },
});

module.exports = mongoose.model("Conversation", ConversationSchema);
