const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { email, password, lastName, firstName } = req.body;

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password: passwordHash,
        lastName,
        firstName,
      });

      const access_token = createAccessToken({
        id: newUser._id,
      });

      // const refresh_token = createRefreshToken({
      //   id: newUser._id,
      //   isAdmin: newUser.isAdmin,
      // });

      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: "/api/refresh_token",
      //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      // });

      await newUser.save();

      res.json({
        msg: "Register successfully!",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(req.body);

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          msg: "Sorry, we can't find an account with this email address. Please try again or create a new account.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: "Incorrect password. Please try again or you can reset your password.",
        });
      }

      const access_token = createAccessToken({
        id: user._id,
      });
      // const refresh_token = createRefreshToken({
      //   id: user._id,
      // });

      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: "/api/refresh_token",
      //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      // });

      res.json({
        msg: "Login successully!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      // res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// const createRefreshToken = (payload) => {
//   return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: "30d",
//   });
// };

module.exports = authCtrl;
