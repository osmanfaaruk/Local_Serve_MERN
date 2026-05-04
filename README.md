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

## ⚙️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/osmanfaaruk/Local_Serve_MERN.git
   ```

2. **Setup Environment Variables:**
   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_secret_key
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Start the Server:**
   ```bash
   npm run dev
   ```

5. **Access the Website:**
   Open `User-Website/index.html` using **Live Server** in VS Code.

## 🔐 Default Admin Credentials

- **Username:** `groupAdmin`
- **Password:** `gorupProject`
*(Can be changed from Admin Settings after login)*

---
© 2026 LocalServe Directory. Built for excellence.
