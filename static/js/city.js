document.addEventListener("DOMContentLoaded", function() {
    // Check if the user has already selected a city
    if (document.cookie.includes("selectedCity")) {
        // If a city is already selected, redirect to the corresponding URL
        var selectedCity = getCookie("selectedCity");
        window.location.href = "/stats/" + encodeURIComponent(selectedCity);
    } else {
        // If no city is selected, show the popup
        document.getElementById("overlay").style.display = "flex";
    }
});


function saveCity() {
    // Get the selected city from the form
    var selectedCity = document.getElementById("city").value;

    // Save the selected city in a cookie
    document.cookie = "selectedCity=" + selectedCity + "; expires=Thu, 31 Dec 2025 12:00:00 UTC; path=/";

    // Close the popup
    document.getElementById("overlay").style.display = "none";

    // You can add further actions after saving the city if needed
    console.log("City selected:", selectedCity);
}

function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}