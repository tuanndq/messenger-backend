const Message = require('../models/Message');
const resourceMessenger = require('../utils/resource');

const messageCtrl = {
    getDefault: async (req, res) => {
        try {
            const conversationId = req.params.id;
            let messages = await Message
                .find({ conversationId })
                .sort({ createdAt: 1 })
                .limit(resourceMessenger.number.defaultMsg);

            res.status(200).json({
                messages,
            });

        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },

    createMsg: async (req, res) => {
        try {
            const { conversationId, senderId, msgType, content } = req.body;
            const messageObj = { conversationId, senderId, msgType, content };

            // Validate data
            Object.keys(messageObj).forEach(field => {
                if (!messageObj[field]) {
                    return res.status(400).json({
                        devMsg: `${field} ${resourceMessenger.msg.err.generalEmpty}`,
                        userMsg: resourceMessenger.msg.err.generalUserMsg,
                    });
                }
            });

            // Everything is OKAY
            const newMessage = new Message({
                conversationId,
                senderId,
                msgType,
                content,
                isDeleted: false,
            });

            await newMessage.save();

            res.status(201).json({
                msg: resourceMessenger.msg.success.messageCreate,
                content: newMessage,
            });

        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },

    removeMsg: async (req, res) => {
        try {
            const _id = req.params.id;
            const message = await Message.findOneAndUpdate(_id, {
                isDeleted: true
            });

            if (!message) {
                return res.status(404).json({
                    devMsg: `Message ${resourceMessenger.msg.err.notFound}`,
                    userMsg: resourceMessenger.msg.err.generalUserMsg,
                })
            }

            res.status(200).json({
                msg: message
            });

        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },
};

module.exports = messageCtrl;
