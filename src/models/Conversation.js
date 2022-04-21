const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
