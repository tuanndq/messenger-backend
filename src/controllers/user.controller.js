const User = require("../models/User");
const resourceMessenger = require("../utils/resource");

const authCtrl = {
  getUserById: async (req, res) => {
    try {
      let user = await User.findById(req.user._id).select("-password");

      if (!user) {
        return res
          .status(400)
          .json({
            devMsg: resourceMessenger.msg.err.notExistUser,
            userMsg: resourceMessenger.msg.err.notExistUser,
          });
      }

      res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  updateInfoUser: async (req, res) => {
    try {
      const {
        lastName,
        firstName,
        gender,
        dateOfBirth,
        address,
        avatar,
        wallpaper,
        bio,
        schools,
        workPlaces,
        lives,
        linked,
      } = req.body;

      console.log(req.body);

      await User.findByIdAndUpdate(req.user._id, {
        lastName: lastName,
        firstName: firstName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        address: address,
        bio: bio,
        schools: schools,
        workPlaces: workPlaces,
        lives: lives,
        linked: linked,
      });

      res.status(200).json({ msg: resourceMessenger.msg.success.updateInfo });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  updatePrivacyUser: async (req, res) => {
    try {
      const { email, password, phoneNumber } = req.body;

      if (password) {
        const password = await bcrypt.hash(password, 12);

        await User.findByIdAndUpdate(req.user._id, {
          password: passwordHash,
        });
      }

      await User.findByIdAndUpdate(req.user._id, {
        email: email,
        phoneNumber: phoneNumber,
      });

      res.status(200).json({ msg: resourceMessenger.msg.success.updatePrivacy });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },
};

module.exports = authCtrl;
