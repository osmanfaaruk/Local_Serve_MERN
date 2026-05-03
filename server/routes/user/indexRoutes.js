const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');
const Provider = require('../../models/Provider');

// GET all categories (for Browse by Category section on homepage)
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET featured/approved providers (for Featured Professionals section)
router.get('/featured-providers', async (req, res) => {
    try {
        const providers = await Provider.find({ status: 'Approved' }).limit(3);
        res.json(providers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
