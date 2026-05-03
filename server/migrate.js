const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const Category = require('./models/Category');
const Location = require('./models/Location');
const Provider = require('./models/Provider');

const migrate = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB for migration');

        // 1. Migrate Categories
        const categoriesPath = path.join(__dirname, '../Admin-Dashboard/data/categories.json');
        if (fs.existsSync(categoriesPath)) {
            const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
            await Category.deleteMany({}); // Clear existing
            await Category.insertMany(categoriesData.map(c => ({ name: c.name, icon: c.icon })));
            console.log('📁 Categories migrated successfully');
        }

        // 2. Migrate Locations
        const locationsPath = path.join(__dirname, '../Admin-Dashboard/data/locations.json');
        if (fs.existsSync(locationsPath)) {
            const locationsData = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));
            await Location.deleteMany({}); // Clear existing
            await Location.insertMany(locationsData.map(l => ({ name: l.name })));
            console.log('📍 Locations migrated successfully');
        }

        console.log('✨ Migration complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration Error:', err);
        process.exit(1);
    }
};

migrate();
