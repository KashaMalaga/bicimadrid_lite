document.getElementById('toggle-legend').addEventListener('click', function () {
    var legend = document.getElementById('legend');
    if (legend.style.display === 'none') {
        legend.style.display = 'block';
    } else {
        legend.style.display = 'none';
    }
});
/*  */
var currentPolygon = null;
$(document).ready(function () {
    let snackbar = document.getElementById("snackbar");
    $(document).on('click', '.geofence-icon', function () {
        var geofenceData = $('#geofence-info').text();
        var capacity = $('#capacity').text();
        if (currentPolygon) {
            snackbar.innerHTML = 'Borrando zona geovallada';
            snackbar.className = "show";
            setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 1500);
            currentPolygon.setMap(null);
            currentPolygon = null;
        } else {
            snackbar.innerHTML = `Dibujando zona geovallada... Capacidad: ${capacity}`;
            snackbar.className = "show";
            setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 1500);
            drawGeofencePolygon(JSON.parse(geofenceData));
        }

    });
});
/*  */
function drawGeofencePolygon(geofenceCoords) {
    const polygon = new google.maps.Polygon({
        paths: geofenceCoords,
        strokeColor: "#9f9d9d",
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: "#9f9d9d",
        fillOpacity: 0.35,
    });
    polygon.setMap(index);
    currentPolygon = polygon;
}
/* Service worker script */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/static/js/service-worker.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
/* Popup */
window.onload = function () {
    var popup = document.getElementById('popup');
    if (document.cookie.replace(/(?:(?:^|.*;\s*)popupShown\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
        popup.style.display = 'flex';
        setTimeout(function () {
            popup.style.display = 'none';
        }, 4000);
        document.cookie = "popupShown=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
}

/*  */
setTimeout(function () {
    $('.alert').fadeOut('fast');
}, 3500);