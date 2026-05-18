// ================================================
// ECONET CONNECT - FULL SCRIPT
// ================================================

let isLoggedIn = false;
let vpnOn = false;
let adblockOn = true;
let hotspotOn = false;
let isDarkMode = false;

// Navigation
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById(`page-${page}`);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('nav-active');
        if (link.id === `nav-${page}`) link.classList.add('nav-active');
    });
}

// Update Auth Buttons
function updateAuthUI() {
    const authSection = document.getElementById('auth-section');
    if (isLoggedIn) {
        authSection.innerHTML = `
            <div class="flex items-center gap-3">
                <button onclick="navigateTo('account')" class="flex items-center gap-2 px-4 py-2 rounded-3xl hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div class="w-8 h-8 bg-green-100 dark:bg-green-900 text-green-600 rounded-2xl flex items-center justify-center font-bold">PG</div>
                    <div class="text-sm">
                        <div class="font-medium">Peter Geng</div>
                        <div class="text-green-600 text-xs">Free</div>
                    </div>
                </button>
                <button onclick="logout()" class="px-5 py-2 text-red-500 hover:bg-red-50 rounded-3xl text-sm font-medium">Log Out</button>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <button onclick="showAuthModal()" class="px-6 py-2.5 bg-white border border-gray-300 rounded-3xl text-sm font-semibold hover:bg-gray-50">Sign In</button>
            <button onclick="showAuthModal()" class="px-6 py-2.5 bg-green-500 text-white rounded-3xl text-sm font-semibold hover:bg-green-600">Sign Up</button>
        `;
    }
}

// Quick Connect
function quickConnect() {
    const btn = document.getElementById('quick-connect-btn');
    const status = document.getElementById('connect-status');
    btn.classList.toggle('!bg-green-500');
    btn.classList.toggle('!text-white');
    status.textContent = btn.classList.contains('!bg-green-500') ? 'CONNECTED' : 'Tap to connect';
    showToast('Connected to Hong Kong Server');
}

// Toggles
function toggleVPN() {
    vpnOn = !vpnOn;
    const status = document.getElementById('vpn-big-status');
    const btn = document.getElementById('vpn-toggle');
    if (vpnOn) {
        status.textContent = "CONNECTED";
        status.classList.add('text-green-500');
        status.classList.remove('text-red-500');
        btn.classList.add('border-green-500', 'text-green-500');
        btn.classList.remove('border-red-500', 'text-red-500');
    } else {
        status.textContent = "DISCONNECTED";
        status.classList.add('text-red-500');
        status.classList.remove('text-green-500');
        btn.classList.add('border-red-500', 'text-red-500');
        btn.classList.remove('border-green-500', 'text-green-500');
    }
}

function toggleAdBlocker() {
    adblockOn = !adblockOn;
    const btn = document.getElementById('adblock-toggle-btn');
    btn.textContent = adblockOn ? "ENABLED" : "DISABLED";
    showToast(adblockOn ? 'Ad Blocker Activated' : 'Ad Blocker Disabled');
}

function toggleHotspot() {
    hotspotOn = !hotspotOn;
    const status = document.getElementById('hotspot-status');
    const btn = document.getElementById('hotspot-btn');
    if (hotspotOn) {
        status.textContent = "ACTIVE";
        status.classList.add('text-green-500');
        btn.textContent = "STOP HOTSPOT";
    } else {
        status.textContent = "INACTIVE";
        status.classList.remove('text-green-500');
        btn.textContent = "START HOTSPOT";
    }
}

// Dark Mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.classList.toggle('fa-moon');
    if (icon) icon.classList.toggle('fa-sun');
}

// Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2800);
}

// Signup
function handleSignup(e) {
    e.preventDefault();
    closeModal();
    isLoggedIn = true;
    updateAuthUI();
    showToast("Account created successfully! Welcome 🎉");
}

// Logout
function logout() {
    isLoggedIn = false;
    updateAuthUI();
    showToast("Logged out successfully");
    navigateTo('home');
}

function loadPricingCards() {
    const container = document.getElementById('account-pricing-cards');
    if (!container) return;

    container.innerHTML = `
        <!-- Monthly -->
        <div onclick="goToUpgrade()" class="plan-card bg-gray-900 border border-gray-700 hover:border-orange-400 rounded-3xl p-6 cursor-pointer transition-all">
            <div class="text-center">
                <div class="text-orange-400 font-bold text-lg">Monthly</div>
                <div class="text-4xl font-bold mt-3">$6.99</div>
                <div class="text-sm text-gray-400">per month</div>
            </div>
            <button onclick="event.stopImmediatePropagation(); goToUpgrade()" 
                    class="mt-8 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-medium">
                Choose
            </button>
        </div>

        <!-- Annually -->
        <div onclick="goToUpgrade()" class="plan-card bg-gray-900 border border-gray-700 hover:border-orange-400 rounded-3xl p-6 cursor-pointer transition-all">
            <div class="text-center">
                <div class="text-orange-400 font-bold text-lg">Annually</div>
                <div class="text-4xl font-bold mt-3">$7.50</div>
                <div class="text-sm text-gray-400">per month</div>
            </div>
            <button onclick="event.stopImmediatePropagation(); goToUpgrade()" 
                    class="mt-8 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-medium">
                Choose
            </button>
        </div>

        <!-- Yearly - Best Value -->
        <div onclick="goToUpgrade()" class="plan-card bg-gradient-to-br from-amber-900 to-orange-900 border-2 border-orange-400 rounded-3xl p-6 cursor-pointer relative shadow-2xl">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-medium px-5 py-1 rounded-full">Best Value</div>
            <div class="text-center">
                <div class="text-orange-400 font-bold text-lg">Yearly</div>
                <div class="text-4xl font-bold mt-3">$3.75</div>
                <div class="text-sm text-green-400">$45 billed yearly</div>
            </div>
            <button onclick="event.stopImmediatePropagation(); goToUpgrade()" 
                    class="mt-8 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-medium">
                Choose
            </button>
        </div>
    `;
}

function goToUpgrade() {
    showToast("Redirecting to payment...");
    setTimeout(() => navigateTo('upgrade'), 700);
}

// Initialize
window.onload = function() {
    navigateTo('home');
    updateAuthUI();
    loadPricingCards();           // This loads the pricing cards in My Account
    
    console.log('%c✅ EcoNet Connect - Fully Loaded!', 'color: #22c55e; font-size: 16px; font-weight: bold');
};