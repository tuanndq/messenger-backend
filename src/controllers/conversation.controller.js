const { ObjectId } = require("mongodb");
const resourceMessenger = require("../utils/resource");
const Conversation = require("../models/Conversation");
const User = require("../models/User");

const conversationCtrl = {
  getById: async (req, res) => {
    const _id = req.params.id;

    try {
      let conversation = await Conversation.findById(_id);

      if (!conversation) {
        return res.status(404).json({
          devMsg: `Conversation ${resourceMessenger.msg.err.notFound}`,
          userMsg: resourceMessenger.msg.err.generalUserMsg,
        });
      }

      res.status(200).json({
        conversation,
      });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  // Get by user Id
  getDefault: async (req, res) => {
    const _id = req.params.userId;
    try {
      let conversations = await Conversation
        .find({
          members: { $in: [_id.toString()] },
        })
        .sort({ updatedAt: 0 })
        .limit(resourceMessenger.number.defaultConversation);
      
      res.status(200).json({ conversations });

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  getMembers: async (req, res) => {
    let { conversationId } = req.params;
    
    try {
      let conversation = await Conversation.findById(conversationId);
      let membersId = conversation.members.map((id) => {
        return ObjectId(id);
      });

      let members = await User.find({
        _id: { $in: membersId },
      });

      res.status(200).json(members);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  create: async (req, res) => {
    const { title, members } = req.body;

    // validate data
    if (!title || !members) {
      return res.status(400).json({
        devMsg: `Conversation: ${resourceMessenger.msg.err.missingInfo}`,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }

    try {
      const conversation = new Conversation({
        title,
        members,
      });

      await conversation.save();

      res.status(201).json({
        conversation,
      });

    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { title, members } = req.body;
    try {
      await Conversation.findByIdAndUpdate(id, {
        title,
        members,
      });
      res.status(200).json({ message: "Update conversation successfully!" });
    } catch (err) {
      return res.status(500).json({
        devMsg: err.message,
        userMsg: resourceMessenger.msg.err.generalUserMsg,
      });
    }
  },
};

module.exports = conversationCtrl;
