const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const adminConfigSchema = new mongoose.Schema({
    username: { type: String, default: 'groupAdmin' },
    passwordHash: { type: String, required: true },
}, { collection: 'adminconfig' });

const AdminConfig = mongoose.models.AdminConfig || mongoose.model('AdminConfig', adminConfigSchema);

async function seedAdmin() {
    const existing = await AdminConfig.findOne();
    if (!existing) {
        const hash = await bcrypt.hash('gorupProject', 10);
        await AdminConfig.create({ username: 'groupAdmin', passwordHash: hash });
        console.log('✅ Default admin account seeded: groupAdmin / gorupProject');
    }
}
seedAdmin().catch(err => console.error('Seed error:', err));

function verifyToken(req, res, next) {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
        req.admin = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ error: 'Username and password required' });

        const admin = await AdminConfig.findOne({ username });
        if (!admin)
            return res.status(401).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, admin.passwordHash);
        if (!match)
            return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ token, username: admin.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/change-password', verifyToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword)
            return res.status(400).json({ error: 'All fields required' });

        if (newPassword.length < 6)
            return res.status(400).json({ error: 'New password must be at least 6 characters' });

        const admin = await AdminConfig.findOne({ username: req.admin.username });
        if (!admin)
            return res.status(404).json({ error: 'Admin not found' });

        const match = await bcrypt.compare(currentPassword, admin.passwordHash);
        if (!match)
            return res.status(401).json({ error: 'Current password is incorrect' });

        admin.passwordHash = await bcrypt.hash(newPassword, 10);
        await admin.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/verify', verifyToken, (req, res) => {
    res.json({ valid: true, username: req.admin.username });
});

module.exports = router;
