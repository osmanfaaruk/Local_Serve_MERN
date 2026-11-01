# LocalServe - Modern Service Provider Directory

A full-stack local service provider directory connecting professional service providers with residents who need quality services. Now featuring a secure administrative portal and robust backend integration.

## 🚀 Key Features

- **Secure Admin Portal:** JWT-based authentication for administrative tasks.
- **Provider Management:** Approve, reject, or manage service providers dynamically.
- **Dynamic Content:** Categories, locations, and provider listings managed via backend.
- **Service Registration:** Full multi-step application form for new providers.
- **Professional UI:** Built with Tailwind CSS and DaisyUI for a premium, responsive experience.

## 📂 Project Structure

```text
.
├── Admin-Dashboard/           # Administrative portal (Protected)
│   ├── adminAuth.js          # Client-side Auth Guard
│   ├── admin-login.html      # Secure Admin Entry
│   ├── settings.html         # Admin Password Management
│   └── index.html            # Admin Stats & Dashboard
├── User-Website/              # Public-facing customer portal
│   ├── user-provider/        # Provider auth & dashboard
│   ├── search-providers.html # Discovery & Filters
│   └── index.html            # Landing page
├── server/                    # Node.js Express Backend
│   ├── routes/               # API Endpoints (Admin & User)
│   ├── models/               # MongoDB Schemas
│   └── index.js              # Server Entry Point
└── package.json               # Dependencies & Scripts
```

## 🛠️ Technology Stack

**Frontend:**
- HTML5, Tailwind CSS (CDN), DaisyUI
- Vanilla JavaScript (ES6+)
- SweetAlert2 for polished interactions

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- JSON Web Token (JWT) for secure sessions
- Bcrypt.js for password hashing



changes from new mac
