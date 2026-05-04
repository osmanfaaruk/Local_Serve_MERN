const express = require('express');
const router = express.Router();
const Location = require('../../models/Location');
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find().sort({ name: 1 });
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/', async (req, res) => {
    const location = new Location(req.body);
    try {
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await Location.findByIdAndDelete(req.params.id);
        res.json({ message: 'Location deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
