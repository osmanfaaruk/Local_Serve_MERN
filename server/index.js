const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const providerRoutes = require('./routes/providerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const locationRoutes = require('./routes/locationRoutes');

app.use('/api/providers', providerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/locations', locationRoutes);

const userIndexRoutes        = require('./routes/user/indexRoutes');           // → index.html
const userSearchRoutes       = require('./routes/user/searchRoutes');          // → search-providers.html
const userProviderDetails    = require('./routes/user/providerDetailsRoutes'); // → provider-details.html

app.use('/api/user/home',             userIndexRoutes);
app.use('/api/user/search',           userSearchRoutes);
app.use('/api/user/provider-details', userProviderDetails);

const formRoutes             = require('./routes/user-provider/formRoutes');      // → form.html
const dashboardRoutes        = require('./routes/user-provider/dashboardRoutes'); // → dashboard.html
const loginRoutes            = require('./routes/user-provider/loginRoutes');     // → login.html
const registerRoutes         = require('./routes/user-provider/registerRoutes');  // → register.html

app.use('/api/user-provider/form',      formRoutes);
app.use('/api/user-provider/dashboard', dashboardRoutes);
app.use('/api/user-provider/login',     loginRoutes);
app.use('/api/user-provider/register',  registerRoutes);

const adminManageProviders   = require('./routes/admin/manageProvidersRoutes');   // → manage-providers.html
const adminManageCategories  = require('./routes/admin/manageCategoriesRoutes');  // → manage-categories.html
const adminManageLocations   = require('./routes/admin/manageLocationsRoutes');   // → manage-locations.html
const adminAddProvider       = require('./routes/admin/addProviderRoutes');       // → add-provider.html
const adminAuthRoutes        = require('./routes/admin/adminAuthRoutes');         // → admin login/auth
const adminManageUsers       = require('./routes/admin/manageUsersRoutes');      // → manage-users.html

app.use('/api/admin/providers',   adminManageProviders);
app.use('/api/admin/categories',  adminManageCategories);
app.use('/api/admin/locations',   adminManageLocations);
app.use('/api/admin/add-provider',adminAddProvider);
app.use('/api/admin/auth',        adminAuthRoutes);
app.use('/api/admin/users',       adminManageUsers);

// Serve User-Website as the root static directory
app.use(express.static(path.join(__dirname, '../User-Website')));

// Serve Admin-Dashboard separately
app.use('/Admin-Dashboard', express.static(path.join(__dirname, '../Admin-Dashboard')));

// Admin portal shortcut
app.get('/admin', (req, res) => {
    res.redirect('/Admin-Dashboard/admin-login.html');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
