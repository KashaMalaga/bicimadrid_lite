/* Location */
var user_marker;
var infowindow;
var isCenterSet = false;

if (navigator.geolocation) {
    const getLocation = () => {
        // Check autoRefreshPreference before attempting to get the user's location
        const autoRefreshPreference = getCookie("autoRefreshPreference");
        if (autoRefreshPreference === "disabled") {
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            if (index && typeof index.setCenter === 'function' && !isCenterSet) {
                index.setCenter(userLocation);
                isCenterSet = true;
            }
            // Update user's marker
            if (user_marker) {
                // If marker already exists, update its location
                const new_position = new google.maps.LatLng(userLocation.lat, userLocation.lng);
                user_marker.setPosition(new_position);
            } else {
                // If marker doesn't exist, create it
                user_marker = new google.maps.Marker({
                    position: userLocation,
                    map: index,
                    icon: '/static/images/pin.png'
                });
            }
        }, () => {
            alert('No he podido obtener tu ubicación y es necesaria para centrarte en el mapa, posicionandote de la estacion más cercana');
        });
    };

    getLocation();
    setInterval(getLocation, 25000);
} else {
    alert('Tu navegador no soporta geolocalización.');
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