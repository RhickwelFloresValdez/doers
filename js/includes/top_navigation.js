// Dynamically loads the top navigation from includes.json and inserts it into the DOM
document.addEventListener("DOMContentLoaded", () => {
    const basePath = window.location.pathname.includes("/doers/") ? "/doers/" : "/";

    fetch(basePath + "includes/includes.json")
        .then(response => response.json())
        .then(data => {
            if (data.topNavigation) {
                return fetch(basePath + data.topNavigation);
            } else {
                throw new Error("Navigation path not found in JSON.");
            }
        })
        .then(response => response.text())
        .then(html => {
            document.getElementById("top-navigation").innerHTML = html;
        })
        // Handles errors if fetching navigation or assets fails (e.g., missing files, JSON errors)
        .catch(error => console.error("Error loading navigation:", error));
});

// Loads top navigation and dynamically sets the logo source from assets.json
document.addEventListener("DOMContentLoaded", () => {
    const basePath = window.location.pathname.includes("/doers/") ? "/doers/" : "/";

    fetch(basePath + "includes/includes.json")
        .then(response => response.json())
        .then(data => {
            if (data.topNavigation) {
                return fetch(basePath + data.topNavigation);
            } else {
                throw new Error("Navigation path not found in JSON.");
            }
        })
        .then(response => response.text())
        .then(html => {
            document.getElementById("top-navigation").innerHTML = html;

            return fetch(basePath + "assets/assets.json");
        })
        .then(response => response.json())
        .then(assets => {
            const logoImg = document.getElementById("logo");
            if (logoImg && assets["logoWithText"]) {
                logoImg.src = basePath + assets["logoWithText"];
            } else {
                console.error("Logo not found in JSON.");
            }
        })
        .catch(error => console.error("Error loading assets or navigation:", error));
});

function showMobileNav() {
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.style.display = 'flex';
    mobileNav.classList.add('slide-in-top');
    document.body.classList.add('no-scroll');
}

function hideMobileNav() {
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.classList.add('slide-out-top');

    mobileNav.addEventListener('animationend', function () {
        mobileNav.style.display = 'none';
        mobileNav.classList.remove('slide-out-top');
        document.body.classList.remove('no-scroll');
    }, { once: true });
}
