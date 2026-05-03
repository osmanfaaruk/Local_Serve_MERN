const express = require('express');
const router = express.Router();
const Provider = require('../../models/Provider');
const Category = require('../../models/Category');
const Location = require('../../models/Location');

// GET all categories (for the category picker dropdown in the form)
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all locations (for the area picker dropdown in the form)
router.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single provider by ID (for pre-filling the edit form)
router.get('/provider/:id', async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) return res.status(404).json({ message: 'Provider not found' });
        res.json(provider);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - admin manually adds a new provider
// isApplied: false ensures this stays in the Admin Added section
router.post('/', async (req, res) => {
    try {
        const providerData = { ...req.body, isApplied: false, status: 'Approved' };
        const provider = new Provider(providerData);
        const newProvider = await provider.save();
        res.status(201).json(newProvider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT - admin edits an existing provider's full info
router.put('/:id', async (req, res) => {
    try {
        const updatedProvider = await Provider.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProvider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
