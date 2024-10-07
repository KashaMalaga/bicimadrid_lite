document.addEventListener("DOMContentLoaded", function() {
    const modeToggle = document.querySelector('#mode-toggle');
    const body = document.querySelector('body');
    const icon = document.querySelector('#mode-toggle i');

    if (modeToggle && body && icon) {
        // Read the 'mode' cookie when the page is loaded
        const modeCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('mode='));
        const mode = modeCookie ? modeCookie.split('=')[1] : null;

        // Set the initial mode based on the 'mode' cookie
        if (mode === 'night') {
            body.classList.add('night-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            body.classList.remove('night-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
        }

        // Add a click event listener to the mode toggle button
        modeToggle.addEventListener('click', () => {
            if (body.classList.contains('night-mode')) {
                body.classList.remove('night-mode');
                icon.classList.replace('fa-sun', 'fa-moon');
                document.cookie = "mode=light"; // Update the 'mode' cookie with the new value
            } else {
                body.classList.add('night-mode');
                icon.classList.replace('fa-moon', 'fa-sun');
                document.cookie = "mode=night"; // Update the 'mode' cookie with the new value
            }
            location.reload();
        });
    } else {
        console.log("modeToggle, body, or icon elements not found.");
    }
});
