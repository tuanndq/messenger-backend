const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    hostId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },
    
    isActive: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Meeting', meetingSchema);
