const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const resourceMessenger = require('../utils/resource');

const messageCtrl = {
    getAllInConversation: async (req, res) => {
        const _conversationId = req.params.conversationId;

        try {
            let messages = await Message
                .find({ _conversationId })
                .sort({ createdAt: -1 });

            if (!messages) {
                return res.status(204).json({ messages });
            }

            res.status(200).json({ messages });

        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },

    getDefault: async (req, res) => {
        const _conversationId = req.params.conversationId;
        const { offset } = req.body;

        try {
            let messages = await Message
                .find({ _conversationId })
                .sort({ createdAt: -1 })
                .limit(offset + resourceMessenger.number.defaultMsg);

            if (!messages) {
                return res.status(204).json({ 
                    messages, 
                    offset, 
                });
            }

            res.status(200).json({ 
                messages,
                offset: offset + resourceMessenger.number.defaultMsg,
            });

        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },

    getById: async (req, res) => {
        const _msgId = req.params.msgId;

        try {
            let message = await Message.findById(_msgId);

            if (!message) {
                return res.status(404).json({
                    devMsg: `Message: ${resourceMessenger.msg.err.notFound}`,
                    userMsg: resourceMessenger.msg.err.generalUserMsg,
                });
            }

            res.status(200).json({ message });

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
                if (!messageObj[field] && messageObj[field] !== 0) {
                    return res.status(400).json({
                        devMsg: `${field} ${resourceMessenger.msg.err.generalEmpty}`,
                        userMsg: resourceMessenger.msg.err.generalUserMsg,
                    });
                }
            });

            // Check if senderId is in the conversation?
            const conversation = await Conversation.findById(conversationId);
            console.log(conversation.members);
            if (!conversation.members.includes(senderId)) {
                return res.status(400).json({
                    devMsg: `Message: ${resourceMessenger.msg.err.missingInfo}`,
                    userMsg: resourceMessenger.msg.err.generalUserMsg,
                });
            }

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
                msg: message,
                alternative: resourceMessenger.msg.success.removeMessage,
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
