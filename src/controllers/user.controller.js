const { default: mongoose } = require("mongoose");
const Story = require("../models/Story");
const User = require("../models/User");
const resourceMessenger = require("../utils/resource");

const userCtrl = {
  getUserById: async (req, res) => {
    try {
      let users = await User.find().limit(resourceMessenger.number.defaultUser);

      if (!users) {
        return res.status(204);
      }

      res.status(200).json({
        users,
      });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      let user = await User.findById(req.user._id).select("-password");

      if (!user) {
        return res.status(400).json({
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

  getSuggesstionUser: async (req, res) => {
    try {
      const users = await User.aggregate([
        { $sample: { size: 5 } },
        {
          $lookup: {
            from: "stories",
            localField: "stories",
            foreignField: "_id",
            as: "result",
          },
        },
      ]).project("-password");

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  searchUsers: async (req, res) => {
    try {
      if (req.query.searchUser) {
        const searchUsers = await User.find({
          $or: [
            {
              fullName: { $regex: new RegExp(req.query.searchUser, "i") },
            },
            {
              $text: { $search: req.query.searchUser },
            },
          ],
        }).limit(20);

        res.json(searchUsers);
      }
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  createStory: async (req, res) => {
    try {
      const { content, type } = req.body;

      const story = new Story({ content, type });

      await story.save();

      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          stories: mongoose.Types.ObjectId(story._id),
        },
      });

      res.status(200).json({
        msg: "Story has been successfully created.",
        story: {
          ...story._doc,
        },
      });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  deleteStory: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: {
          stories: req.params.id,
        },
      });

      await Story.findByIdAndDelete(req.params.id);

      res.json({ msg: "Story has been successfully deleted." });
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
        avatar,
        wallpaper,
        bio,
      } = req.body;

      console.log(req.body);

      await User.findByIdAndUpdate(req.user._id, {
        lastName: lastName,
        firstName: firstName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        bio: bio,
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

      res
        .status(200)
        .json({ msg: resourceMessenger.msg.success.updatePrivacy });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },
};

module.exports = userCtrl;
