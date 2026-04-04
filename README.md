# LocalServe - Service Provider Directory

A local service provider directory connecting Chittagong's professionals with residents who need quality services.

## Project Structure

```text
.
├── Admin-Dashboard/           # Administrative portal
│   ├── data/                 # JSON data (categories, locations, providers)
│   ├── manage-providers.html # Provider approval & management
│   ├── manage-categories.html# Service category management
│   ├── manage-locations.html # Location management
│   ├── add-provider.html     # Add new provider form
│   ├── settings.html         # Admin settings & password
│   └── index.html            # Admin dashboard
├── User-Website/              # Public-facing portal
│   ├── company-terms/        # About, Privacy, Terms, Contact pages
│   ├── user-provider/        # Provider registration, login & dashboard
│   ├── search-providers.html # Search & filter providers
│   ├── provider-details.html # Provider profile page
│   └── index.html            # Landing page
└── README.md
```

## Technology Stack

- HTML5, CSS
- Tailwind CSS (CDN)
- DaisyUI 3.1.0
- Font Awesome 6.4.0
- SweetAlert2
- Vanilla JavaScript
- LocalStorage for state
- JSON files for data

## How to Run Locally

Follow these steps to get the project running on your machine:

### Step 1: Clone the Repository

Open your terminal (Command Prompt / PowerShell / Git Bash) and run:

```bash
git clone https://github.com/osmanfaaruk/Main_Local_Serve_Share.git
```

### Step 2: Open the Project

Open the cloned folder in **VS Code**:

```bash
cd Main_Local_Serve_Share
code .
```

### Step 3: Install Live Server Extension

This project uses local JSON files for data, so you need a local server to avoid CORS errors.

1. In VS Code, go to **Extensions** (Ctrl+Shift+X)
2. Search for **"Live Server"** by Ritwick Dey
3. Click **Install**

### Step 4: Start the Website

1. Open `User-Website/index.html` in VS Code
2. Right-click anywhere in the file
3. Select **"Open with Live Server"**
4. The website will open in your browser automatically

### Step 5: Access the Admin Panel

1. Open `Admin-Dashboard/index.html` in VS Code
2. Right-click → **"Open with Live Server"**

Or simply click the **"Admin Portal"** link in the website navbar.

### Quick Links After Running

| Portal          | File to Open                    |
| --------------- | ------------------------------- |
| Customer Website | `User-Website/index.html`      |
| Admin Dashboard  | `Admin-Dashboard/index.html`   |
| Provider Login   | `User-Website/user-provider/login.html` |

> **Note:** No `npm install` or build step needed. Everything runs directly from CDN links. Just open with Live Server and you're good to go.
