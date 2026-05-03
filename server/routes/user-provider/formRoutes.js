const express = require('express');
const router = express.Router();
const Provider = require('../../models/Provider');
const Category = require('../../models/Category');
const Location = require('../../models/Location');

// GET all categories (to populate the category picker in the form)
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all locations (to populate the area picker in the form)
router.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - submit a new provider application from the user-facing form
// isApplied is always set to true here to mark it as a user application
router.post('/submit', async (req, res) => {
    try {
        const providerData = { ...req.body, isApplied: true, status: 'Under Review' };
        const provider = new Provider(providerData);
        const newProvider = await provider.save();
        res.status(201).json(newProvider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
