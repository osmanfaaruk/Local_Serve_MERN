/**
 * ========================================
 * LocalServe Admin - Shared Sidebar
 * ========================================
 * 
 * Generates the admin sidebar on every page automatically.
 * Include this file in any admin page:
 *   <aside id="admin-sidebar"></aside>
 *   <script src="js/sidebar.js"></script>
 * 
 * The active page is auto-detected from the current URL.
 */

(function () {
    // ─── Menu Configuration (edit here to update all pages) ───
    const menuItems = [
        { section: 'Main Menu' },
        { label: 'Dashboard', icon: 'fas fa-chart-pie', href: 'index.html' },
        { label: 'Providers', icon: 'fas fa-users', href: 'manage-providers.html' },
        { label: 'Categories', icon: 'fas fa-th-large', href: 'manage-categories.html' },
        { label: 'Locations', icon: 'fas fa-map-marker-alt', href: 'manage-locations.html' },
        { divider: true },
        { section: 'System' },
        { label: 'Settings', icon: 'fas fa-cog', href: '#' },
        { label: 'Security', icon: 'fas fa-shield-alt', href: '#' },
    ];

    // ─── Detect current page from URL ───
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // ─── Build sidebar HTML ───
    let html = '';

    menuItems.forEach(item => {
        if (item.section) {
            // Section heading
            html += `<div class="text-xs font-bold text-base-content/40 uppercase px-4 mb-4 tracking-widest mt-4">${item.section}</div>`;
        } else if (item.divider) {
            // Divider line
            html += `<div class="divider"></div>`;
        } else {
            // Menu link
            const isActive = currentPage === item.href;
            const activeClass = isActive
                ? 'bg-primary/10 text-primary font-bold'
                : '';
            html += `<a href="${item.href}" class="btn btn-ghost btn-md w-full justify-start gap-4 ${activeClass}">
                <i class="${item.icon}"></i> ${item.label}
            </a>`;
        }
    });

    // ─── Inject into the sidebar container ───
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) {
        sidebar.innerHTML = html;
    }
})();
