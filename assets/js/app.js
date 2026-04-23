
/* =========================================================
   🟢 APP INITIALIZATION (ENTRY POINT)
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadSidebar();
    loadPage('sales-dash'); // default page load
});


/* =========================================================
   🟢 NAVBAR MODULE
========================================================= */

// Load Navbar HTML into DOM
function loadNavbar() {
    fetch('../components/navbar.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;

            // Initialize navbar events after DOM injection
            setTimeout(initNavbarDropdown, 200);
        });
}

// Navbar dropdown + actions logic
function initNavbarDropdown() {

    // Dropdown items (Profile, Edit Profile etc.)
    document.querySelectorAll('.dropdown-item[data-page]').forEach(item => {
        item.addEventListener('click', function () {

            const page = this.getAttribute('data-page');

            loadPage(page);           // load selected page
            clearSidebarActive();     // reset sidebar active state
        });
    });

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            alert("Logout logic here");
            // future: clear storage + redirect login
        });
    }
}


/* =========================================================
   🟢 SIDEBAR MODULE
========================================================= */

// Load Sidebar HTML into DOM
function loadSidebar() {
    fetch('../components/sidebar.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('sidebar').innerHTML = html;

            // Initialize sidebar events after DOM injection
            initSidebar();
        });
}

// Sidebar click + active state + routing
function initSidebar() {

    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {

            // remove active from all
            menuItems.forEach(el => el.classList.remove('active'));

            // add active to clicked
            this.classList.add('active');

            // get page name
            const page = this.getAttribute('data-page');

            // load page
            loadPage(page);
        });
    });
}

// Remove sidebar active state (used by navbar/profile actions)
function clearSidebarActive() {

    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.classList.remove('active');
    });
}


/* =========================================================
   🟢 PAGE LOADER (ROUTER CORE)
========================================================= */

// Load dynamic page into main container
function loadPage(pageName) {

    fetch(`../components/${pageName}.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        });
}