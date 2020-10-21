var mymap = L.map('mapid').setView([52.22992817667709, 21.00809365510941], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmFkaWV1cyIsImEiOiJja2dmNjNneTAwdWxwMnZxejY1aGRkdm03In0.FS9_5BuYbcxDQWSTseVO3A'
}).addTo(mymap);

var template = '<form data-persist="garlic">\
    <input type="text" id="Ifrom" name="Ifrom" placeholder="Pickup Address"required><br>\
    <input type="text" id="Ito" name="Ito" placeholder="Destination Address" required><br>\
    <input type="date" id="IDate" name="IDate" placeholder="Date" required><br>\
    <input type="text" id="Itext" name="Itext" placeholder="Details"><br>\
    <input type="text" id="Iname" name="Iname" placeholder="Name" required><br>\
    <input type="text" id="Isurname" name="Isurname" placeholder="Surame" required><br>\
    <input type="email" id="Imail" name="Imail" placeholder="Email" required><br>\
    <input type="tel" id="Iphone" name="Iphone" placeholder="Phone" required>\
<button id="btnSubmit">Submit</button>\
</form>'

var markerArray = [];

function onMapClick(e) {
    var marker = L.marker(e.latlng).addTo(mymap);
    markerArray.push(marker)
    marker.bindPopup(template, {
        maxWidth: "auto"
      });
      marker.openPopup;
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
