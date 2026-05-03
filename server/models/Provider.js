const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    type: { type: String, enum: ['Company', 'Self Provider'], required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    about: { type: String, required: true },
    categories: [String],
    areas: [String],
    offeredServices: [String],
    workDays: [String],
    workTimeStart: String,
    workTimeEnd: String,
    priceConsult: String,
    priceHourly: String,
    experience: String,
    whyChooseUs: [String],
    status: { 
        type: String, 
        enum: ['Under Review', 'Approved', 'Rejected', 'Need More Info'],
        default: 'Under Review' 
    },
    statusReason: { type: String, default: '' },
    isApplied: { type: Boolean, default: false },
    verificationStatus: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Provider', providerSchema);
