const express = require('express');
const router = express.Router();
const Provider = require('../../models/Provider');

// GET a single provider by ID (for the provider's own dashboard)
router.get('/:id', async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) return res.status(404).json({ message: 'Provider not found' });
        res.json(provider);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
