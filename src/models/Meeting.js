const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    hostId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Meeting", MeetingSchema);
