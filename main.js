let calculateButton = document.getElementById("calculateButton");
calculateButton.onclick = calculate;

function calculate() {
    // Weight of earth in Newtons then converted to kg. W = m * g
    var earthWeight = 6.673e-10 * 5.97219e24 * 0.10197162129779283;

    var userWeight = document.getElementById('weight').value;

    var countryLat = getCountryLat();

    var gravityAtLocation =
        earthWeight / (getLocationGravity(countryLat) * 1e3) ** 2;

    // The final calculated attractiveness of the user in meters per seconds squared (m / s^2)
    var userAttractiveness = (userWeight * gravityAtLocation) / earthWeight;

    document.getElementById('attractiveness').value = userAttractiveness + ' m/sec²';
    document.getElementById('outputSection').classList.remove('hidden');
}

function getLocationGravity(l) {
    // Geocentric radius formula found at https://en.wikipedia.org/wiki/Earth_radius#Geocentric_radius

    var r1 = 6378.137; // Radius of earth at its equator
    var r2 = 6371.001; // Radius of earth at its poles

    var lat = this.toRadians(+l); // Convert degress to radians

    var left =
        Math.pow(Math.pow(r1, 2) * Math.cos(lat), 2) +
        Math.pow(Math.pow(r2, 2) * Math.sin(lat), 2);
        
    var right =
        Math.pow(r1 * Math.cos(lat), 2) + Math.pow(r2 * Math.sin(lat), 2);

    return Math.sqrt(left / right);
}

function toRadians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

function getCountryLat() {
    var country = document.getElementById('country').value;

    var url =
        'https://nominatim.openstreetmap.org/search?country=' +
        country +
        '&format=json';

    var Httpreq = new XMLHttpRequest();
    Httpreq.open('GET', url, false);
    Httpreq.send(null);

    return JSON.parse(Httpreq.responseText).find(x => x.lat)['lat'];
}
