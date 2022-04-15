const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    members: {
      // Array of Member-ID
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
