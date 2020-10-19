var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmFkaWV1cyIsImEiOiJja2dmNjNneTAwdWxwMnZxejY1aGRkdm03In0.FS9_5BuYbcxDQWSTseVO3A'
}).addTo(mymap);

var popup = L.popup();

var markerArray = [];

function onMapClick(e) {
    var marker = L.marker(e.latlng).addTo(mymap);
    markerArray.push(marker)
}

function showNewPackageForm() {
    var displayStyle = document.getElementById('newPackageForm').style.display;
    if (displayStyle == "block") {
        document.getElementById('newPackageForm').style.display = "none";
    } else {
        document.getElementById('newPackageForm').style.display = "block";
    }
}

mymap.on('click', onMapClick);