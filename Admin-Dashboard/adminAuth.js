/**
 * adminAuth.js
 * Shared admin authentication guard.
 * Include this script in every admin page (except admin-login.html).
 * It verifies the stored JWT token with the server.
 * If invalid/missing, redirects to admin-login.html.
 */

const API = '/api/admin/auth';

/**
 
 * Call this at the top of every admin page's window.onload (or directly).
 * Returns the username if valid, otherwise redirects to login.
 
 */
async function requireAdminAuth() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        redirectToLogin();
        return null;
    }

    try {
        const res = await fetch(`${API}/verify`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
            clearAdminSession();
            redirectToLogin();
            return null;
        }

        const data = await res.json();
        return data.username;
    } catch (err) {

        clearAdminSession();
        redirectToLogin();
        return null;
    }
}

function clearAdminSession() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
}

function adminLogout() {
    clearAdminSession();
    redirectToLogin();
}

function redirectToLogin() {

    const path = window.location.pathname;
    const inAdminDir = path.includes('/Admin-Dashboard/');
    window.location.href = inAdminDir ? 'admin-login.html' : '/Admin-Dashboard/admin-login.html';
}

/** Returns the stored auth header for API calls */
function adminAuthHeader() {
    const token = localStorage.getItem('adminToken');
    return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : {};
}
