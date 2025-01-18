const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    otp: { 
        type: String, 
        default: null 
    },
    otpExpiry: { 
        type: Date, 
        default: null 
    },
    failedAttempts: { type: Number, default: 0 }, // Track failed login attempts
    lockUntil: { type: Date, default: null }, // Track time when the user can attempt login again
});

const User = mongoose.model('User', userSchema);
module.exports = User;
