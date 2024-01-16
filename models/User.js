const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: String,
    email: String,
    otp: String, // Add the 'otp' field for storing the OTP
    // verified: Boolean,
    uid: String,
    address: String,
    createdAt: Date,
    expiresAt: Date,
});

const User = mongoose.model('Project_DEP_2024', UserSchema);
module.exports = User;
