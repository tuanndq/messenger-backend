const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    modifiedDate: {
        type: Date,
        default: Date.now,
    },

    members: {
        type: Array,
    },
});

module.exports = mongoose.model('Conversation', conversationSchema);
