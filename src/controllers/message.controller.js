const Message = require('../models/Message');
const resourceMessenger = require('../utils/resource');

const messageCtrl = {
    getDefault: async (req, res) => {
        try {
            // const conversationId = req.params.id;
            // let messages = await Message.find({ conversationId }).sort().limit(resourceMessenger.number.defaultMsg);

            // res.status(200).json({
            //     messages,
            // });



            // TODO: get params (conversationId)
            
            // TODO: find by conversationId, sort by createdDate, limit 20 message

            // TODO: response

        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },

    createMsg: async (req, res) => {
        try {
            // TODO: object (form) of the Message

            // TODO: validating data and saving
        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },

    removeMsg: async (req, res) => {
        try {
            // TODO: get params (messageId)

            // TODO: update isDeleted from FALSE -> TRUE
        } catch (err) {
            return res.status(500).json({
                devMsg: err.message,
                userMsg: resourceMessenger.msg.err.generalUserMsg,
            });
        }
    },
};

module.exports = messageCtrl;
