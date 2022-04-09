const Conversation = require('../models/Conversation');
const resourceMessenger = require('../utils/resource');

const conversationCtrl = {
    getById: async (req, res) => {
        try {
            const _id = req.params.id;
            let conversation = Conversation.findById(_id);

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

    getDefault: async (req, res) => {
        try {

        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },

    create: async (req, res) => {
        try {

        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },

    update: async (req, res) => {
        try {

        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },
};

module.exports = conversationCtrl;
