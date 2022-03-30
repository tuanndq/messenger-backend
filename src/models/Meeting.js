const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({});

module.exports = mongoose.model("Meeting", MeetingSchema);
