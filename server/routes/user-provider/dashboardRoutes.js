const express = require('express');
const router = express.Router();
const Provider = require('../../models/Provider');
const User = require('../../models/User');

router.get('/me/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('providerId');
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!user.providerId) return res.json({ provider: null });
        res.json({ provider: user.providerId });
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

module.exports = router;
