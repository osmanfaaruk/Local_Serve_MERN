const express = require('express');
const router = express.Router();
const Provider = require('../../models/Provider');
const Location = require('../../models/Location');
router.get('/providers', async (req, res) => {
    try {
        const { category, area } = req.query;
        let query = { status: 'Approved' };

        if (category) query.categories = { $in: [category] };
        if (area) query.areas = { $in: [area] };

        const providers = await Provider.find(query);
        res.json(providers);
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

module.exports = router;
