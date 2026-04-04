
# LocalServe - Service Provider Directory

A local service provider directory connecting Chittagong's professionals with residents.

## Project Structure

```text
.
├── Admin-Dashboard/           # Administrative portal for managing the platform
│   ├── data/                 # JSON data stores (categories, locations, providers)
│   ├── manage-providers.html # Provider approval & management
│   ├── manage-categories.html# Service category management
│   ├── manage-locations.html # Location management
│   ├── add-provider.html     # Add new provider form
│   ├── settings.html         # Admin settings & password
│   └── index.html            # Admin main dashboard
├── User-Website/              # Public-facing portal for customers
│   ├── company-terms/        # Legal and information pages (About, Privacy, etc.)
│   ├── user-provider/        # Provider registration & login
│   ├── search-providers.html # Main search & listing interface
│   ├── provider-details.html # Detailed profile view for professionals
│   └── index.html            # Main landing page
└── README.md                  # Project documentation
```

## How to Run

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/osmanfaaruk/Main_Local_Serve_Share.git
    cd Main_Local_Serve_Share
    ```
2. **Open with Live Server**:
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

## For Contributors

1. Always pull the latest changes before starting: `git pull origin main`
2. Add your changes and commit with descriptive messages
3. Push your changes: `git push origin main`
