const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({});

module.exports = mongoose.model("Conversation", ConversationSchema);
