document.addEventListener("DOMContentLoaded", () => {
    // Determine base path depending on URL structure
    const basePath = window.location.pathname.includes("/doers-website/") ? "/doers-website/" : "/";

    // Load navigation HTML
    fetch(basePath + "data/json/includes.json")
        .then(response => response.json())
        .then(data => {
            if (!data.headers?.['header-nav']) throw new Error("Navigation path not found in JSON.");
            return fetch(basePath + data.headers['header-nav']);
        })
        .then(response => response.text())
        .then(html => {
            document.getElementById("header-nav").innerHTML = html;

            // Load assets (e.g., logo) after navigation is set
            return fetch(basePath + "data/json/assets.json");
        })
        .then(response => response.json())
        .then(assets => {
            const logoImg = document.getElementById("header-logo");
            if (logoImg && assets.logos['doers-logo-with-text']) {
                logoImg.src = basePath + assets.logos['doers-logo-with-text']; 
            } else {
                console.error("Logo not found in JSON.");
            }
        })
        .catch(error => console.error("Error loading assets or navigation:", error));
});

function showMobileNav() {
    const mobileNav = document.querySelector('.header-nav__mobile-nav');
    mobileNav.style.display = 'flex';
    mobileNav.classList.add('slide-in-top');
    document.body.classList.add('no-scroll');
}

function hideMobileNav() {
    const mobileNav = document.querySelector('.header-nav__mobile-nav');
    mobileNav.classList.add('slide-out-top');

    mobileNav.addEventListener('animationend', function () {
        mobileNav.style.display = 'none';
        mobileNav.classList.remove('slide-out-top');
        document.body.classList.remove('no-scroll');
    }, { once: true });
}