const express = require('express');
const router = express.Router();
const Provider = require('../../models/Provider');
const Category = require('../../models/Category');
const Location = require('../../models/Location');
const User = require('../../models/User');

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/submit', async (req, res) => {
    try {
        const { userId, ...providerFields } = req.body;
        const providerData = { ...providerFields, isApplied: true, status: 'Under Review' };
        const provider = new Provider(providerData);
        const newProvider = await provider.save();

        if (userId) {
            await User.findByIdAndUpdate(userId, { providerId: newProvider._id });
        }

        res.status(201).json(newProvider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
