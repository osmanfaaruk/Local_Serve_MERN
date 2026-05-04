const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
