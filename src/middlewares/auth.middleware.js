const User = require("../models/User");
const jwt = require("jsonwebtoken");
const resourceMessenger = require("../utils/resource");

const auth = async (req, res, next) => {
  try {
    let token;
    if (req.header("Authorization").split(" ").length === 2) {
      token = req.header("Authorization").split(" ")[1];
    } else {
      token = req.header("Authorization");
    }

    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(400).json({ msg: "Invalid Authentication." });
    }

    const user = await User.findOne({ _id: decoded.id });

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      devMsg: err.message,
      userMsg: resourceMessenger.msg.err.generalUserMsg,
    });
  }
};

module.exports = auth;
