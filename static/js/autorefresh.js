/* AutoRefresh*/
document.addEventListener("DOMContentLoaded", function() {
    var autoRefresh = document.getElementById('autoRefresh');
    var checkbox = document.getElementById('autoRefreshCheckbox');
    
    // Check for the presence of a cookie
    var autoRefreshPreference = getCookie("autoRefreshPreference");

    if (autoRefreshPreference === null) {
        // Cookie not present, set default to true
        autoRefreshPreference = "enabled";
        setCookie("autoRefreshPreference", autoRefreshPreference, 30);
    }

    if (autoRefreshPreference === "enabled") {
        // Enable auto-refresh
        checkbox.checked = true;
        if (!autoRefresh) {
            autoRefresh = document.createElement('meta');
            autoRefresh.id = 'autoRefresh';
            autoRefresh.httpEquiv = 'refresh';
            autoRefresh.content = '60';
            document.head.appendChild(autoRefresh);
        }
    } else {
        // Disable auto-refresh (default behavior)
        checkbox.checked = false;
        if (autoRefresh) {
            autoRefresh.parentNode.removeChild(autoRefresh);
        }
    }
});

function toggleAutoRefresh() {
    var autoRefresh = document.getElementById('autoRefresh');
    var checkbox = document.getElementById('autoRefreshCheckbox');
    let snackbar = document.getElementById("snackbar"); 
    if (checkbox.checked) {
        // Enable auto-refresh
        if (!autoRefresh) {
            // If meta tag is not present, add it back
            autoRefresh = document.createElement('meta');
            autoRefresh.id = 'autoRefresh';
            document.head.appendChild(autoRefresh);
        }
        autoRefresh.httpEquiv = 'refresh';
        autoRefresh.content = '60';
        setCookie("autoRefreshPreference", "enabled", 30);
        snackbar.innerHTML = 'Auto-Refresco cada minuto';
        snackbar.className = "show";
        setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 1500);
       
    } else {
        // Disable auto-refresh
        if (autoRefresh) {
            autoRefresh.parentNode.removeChild(autoRefresh);
        }
        checkbox.checked = false;
        setCookie("autoRefreshPreference", "disabled", 30); // Set cookie to remember preference
        snackbar.innerHTML = 'Auto-Refresco desactivado';
        snackbar.className = "show";
        setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 1500);
        
    }
}
// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}