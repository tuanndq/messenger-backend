const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        unique: true,
    },
    
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 60,
    },
    
    firstName: {
        type: String,
    },
    
    lastName: {
        type: String,
    },
    
    fullName: {
        type: String,
        required: true,
    },
    
    // male -> 0
    // female -> 1
    // others -> 2
    gender: {
        type: Number,
        required: true,
    },

    dateOfBirth: {
        type: Date,
        required: true,
    },

    address: {
        type: String,
    },

    // offline -> 0
    // online -> 1
    // notWorking -> 2
    userStatus: {
        type: Number,
        default: 0
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    modifiedDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
