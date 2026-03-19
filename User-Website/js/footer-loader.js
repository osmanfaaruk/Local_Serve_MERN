/**
 * LocalServe - Unified Footer Loader
 * ----------------------------------
 * This script injects a consistent, premium footer into all user-facing pages.
 * To use: Add <div id="footer-placeholder"></div> and link this script.
 */

document.addEventListener('DOMContentLoaded', () => {
    const isSubdir = window.location.pathname.includes('/company-terms/');
    const pfx = isSubdir ? '../' : '';

    const footerTemplate = `
    <footer class="bg-slate-950 text-slate-300 pt-20 pb-10 px-6 md:px-20 border-t border-white/5">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <!-- Brand Section -->
            <div class="space-y-6">
                <div class="flex items-center gap-2">
                    <div class="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-700/20">
                        <i class="fas fa-layer-group"></i>
                    </div>
                    <span class="text-2xl font-black text-white tracking-tight">LocalServe</span>
                </div>
                <p class="text-sm leading-relaxed opacity-70">
                    Connecting Chittagong's finest professionals with residents who value quality, reliability, and speed. Your trusted neighborhood directory since 2026.
                </p>
                <div class="flex gap-4">
                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all border border-white/10">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all border border-white/10">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all border border-white/10">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all border border-white/10">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>

            <!-- Quick Links -->
            <div class="space-y-6">
                <h4 class="text-white font-bold uppercase tracking-widest text-xs">Explore LocalServe</h4>
                <ul class="space-y-4 text-sm">
                    <li><a href="${pfx}index.html" class="hover:text-blue-700 hover:translate-x-1 transition-all inline-block">Home & Featured</a></li>
                    <li><a href="${pfx}search-providers.html" class="hover:text-blue-700 hover:translate-x-1 transition-all inline-block">Search All Providers</a></li>
                    <li><a href="${pfx}request-to-serve.html" class="hover:text-blue-700 hover:translate-x-1 transition-all inline-block">Become a Provider</a></li>
                </ul>
            </div>

            <!-- Company & Legal -->
            <div class="space-y-6">
                <h4 class="text-white font-bold uppercase tracking-widest text-xs">Company & Terms</h4>
                <ul class="space-y-4 text-sm">
                    <li><a href="${pfx}company-terms/about-mission.html" class="hover:text-blue-700 hover:translate-x-1 transition-all inline-block">About Our Mission</a></li>
                    <li><a href="${pfx}company-terms/contact-support.html" class="hover:text-blue-700 hover:translate-x-1 transition-all inline-block">Contact Support</a></li>
                    <li><a href="${pfx}company-terms/privacy-policy.html" class="hover:text-blue-700 hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
                    <li><a href="${pfx}company-terms/terms-of-service.html" class="hover:text-blue-700 hover:translate-x-1 transition-all inline-block">Terms of Service</a></li>
                </ul>
            </div>

            <!-- Contact -->
            <div class="space-y-6">
                <h4 class="text-white font-bold uppercase tracking-widest text-xs">Contact</h4>
                <ul class="space-y-4 text-sm">
                    <li class="flex items-start gap-3">
                        <i class="fas fa-map-marker-alt text-blue-700 mt-1"></i>
                        <span>Chadgaon, Chottogram</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <i class="fas fa-phone-alt text-blue-700"></i>
                        <a href="tel:+8801841483138" class="hover:text-blue-700 transition-colors">+8801841483138</a>
                    </li>
                    <li class="flex items-center gap-3">
                        <i class="fas fa-envelope text-blue-700"></i>
                        <a href="mailto:localserve.admin@hotmail.com" class="hover:text-blue-700 transition-colors">localserve.admin@hotmail.com</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Copyright Bottom -->
        <div class="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center">
            <p class="text-xs font-medium opacity-50 tracking-wide">
                &copy; 2026 LocalServe Directory.
            </p>
        </div>
    </footer>
    `;

    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.innerHTML = footerTemplate;
    }
});
