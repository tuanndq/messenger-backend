const mongoose = require("mongoose");
const { enumMessenger } = require("../utils/enum");

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  // male -> 0
  // female -> 1
  // others -> 2
  gender: {
    type: Number,
    required: true,
    default: enumMessenger.gender.male,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  address: {
    type: String,
  },

  // offline -> 0
  // online -> 1
  // notWorking -> 2
  userStatus: {
    type: Number,
    default: enumMessenger.userStatus.offline,
  },
});

module.exports = mongoose.model("User", userSchema);
