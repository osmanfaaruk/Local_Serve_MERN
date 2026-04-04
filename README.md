

## 📂 Project Structure

```text
.
├── Admin-Dashboard/           # Administrative portal for managing the platform
│   ├── data/                 # JSON data stores (categories, locations, etc.)
│   ├── js/                   # Dashboard-specific logic
│   ├── manage-providers.html # Provider approval & management
│   ├── manage-categories.html# Service category management
│   └── index.html            # Admin main dashboard
├── User-Website/              # Public-facing portal for customers
│   ├── company-terms/        # Legal and information pages (About, Privacy, etc.)
│   ├── js/                   # Frontend dynamic logic (footer, categories, etc.)
│   ├── user-provider/        # Provider registration & login
│   ├── search-providers.html # Main search & listing interface
│   ├── provider-details.html # Detailed profile view for professionals
│   └── index.html            # Main landing page
└── README.md                  # Project documentation
```

3. **Explore**:
   - **Customer Portal**: `User-Website/index.html`
   - **Admin Portal**: `Admin-Dashboard/index.html`

## Technology Stack

- HTML5, CSS
- Tailwind CSS (CDN)
- DaisyUI 3.1.0
- Font Awesome 6.4.0
- SweetAlert2
- Vanilla JavaScript
- LocalStorage for state
- JSON files for data
