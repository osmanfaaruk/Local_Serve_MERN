const express = require('express');
const router = express.Router();
const Provider = require('../../models/Provider');

// GET all providers (admin sees both applied and admin-added)
router.get('/', async (req, res) => {
    try {
        const providers = await Provider.find().sort({ createdAt: -1 });
        res.json(providers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single provider by ID
router.get('/:id', async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) return res.status(404).json({ message: 'Provider not found' });
        res.json(provider);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT - update a provider's status (Approve / Reject / Under Review)
// Also saves the statusReason for user-facing feedback
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

// DELETE a provider (admin-added only; applied ones use status instead)
router.delete('/:id', async (req, res) => {
    try {
        await Provider.findByIdAndDelete(req.params.id);
        res.json({ message: 'Provider deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
