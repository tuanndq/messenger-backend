const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const resourceMessenger = require("../utils/resource");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { email, password, lastName, firstName, gender, dateOfBirth } =
        req.body;

      // Validate data
      if (!email) {
        return res.status(400).json({
          devMsg: resourceMessenger.msg.err.emailEmptyMsg,
          userMsg: resourceMessenger.msg.err.emailEmptyMsg,
        });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({
          devMsg: resourceMessenger.msg.err.emailErrMsg,
          userMsg: resourceMessenger.msg.err.emailErrMsg,
        });
      }

      if (!password) {
        return res.status(400).json({
          devMsg: resourceMessenger.msg.err.passEmptyMsg,
          userMsg: resourceMessenger.msg.err.passEmptyMsg,
        });
      }

      // Everything is OKAY
      const passwordHash = await bcrypt.hash(password, 12);

      const fullName = firstName.concat(" ", lastName);

      const newUser = new User({
        email,
        password: passwordHash,
        lastName,
        firstName,
        fullName,
        gender,
        dateOfBirth,
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

      res.status(201).json({
        msg: resourceMessenger.msg.success.register,
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate email
      if (!validateEmail(email)) {
        return res.status(400).json({
          devMsg: resourceMessenger.msg.err.emailErrMsg,
          userMsg: resourceMessenger.msg.err.emailErrMsg,
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          msg: resourceMessenger.msg.err.notExistAccount,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: resourceMessenger.msg.err.wrongPassword,
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
        msg: resourceMessenger.msg.success.login,
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  logout: async (req, res) => {
    try {
      // res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res
        .status(200)
        .json({ msg: resourceMessenger.msg.success.logout });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  forgotPass: async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: resourceMessenger.msg.err.notExistAccount,
      });
    }

    return res.json({ user });
  },

  otp: async (req, res) => {
    const email = req.body.email;
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "qthang1310@outlook.com",
        pass: "L0r3mSt1ckyP4ss",
      },
    });

    const options = {
      from: "qthang1310@outlook.com",
      to: email,
      subject: "OTP Forgot Password",
      text: "You recieved message from " + email,
      html: `<p>Your OTP code is: ${otp}</p>`,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("Message sent: " + info.response);
      }
    });

    return res.status(200).json({ otp: otp });
  },

  changePassword: async (req, res) => {
    const { email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.findOneAndUpdate(
      { email: email },
      { password: passwordHash }
    );

    return res.json({ user });
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

const validateEmail = (email) => {
  const regex = resourceMessenger.regex.email;
  return regex.test(String(email).toLowerCase());
};

module.exports = authCtrl;
