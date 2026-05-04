const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');
router.get('/', async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) return res.status(404).json({ message: 'Provider not found' });
        res.json(provider);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/', async (req, res) => {
    const provider = new Provider(req.body);
    try {
        const newProvider = await provider.save();
        res.status(201).json(newProvider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedProvider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProvider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await Provider.findByIdAndDelete(req.params.id);
        res.json({ message: 'Provider deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
