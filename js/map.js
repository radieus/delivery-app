var mymap = L.map('mapid').setView([52.22992817667709, 21.00809365510941], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmFkaWV1cyIsImEiOiJja2dmNjNneTAwdWxwMnZxejY1aGRkdm03In0.FS9_5BuYbcxDQWSTseVO3A'
}).addTo(mymap);

var template = '<form data-persist="garlic" action="#" onsubmit="addPoint(); return false">\
    <input type="text" id="Ifrom" name="Ifrom" placeholder="Pickup Address" required><br>\
    <input type="text" id="Ito" name="Ito" placeholder="Destination Address" ><br>\
    <input type="date" id="IDate" name="IDate" placeholder="Date" ><br>\
    <input type="text" id="Itext" name="Itext" placeholder="Details"><br>\
    <input type="text" id="Iname" name="Iname" placeholder="Name" ><br>\
    <input type="text" id="Isurname" name="Isurname" placeholder="Surame" ><br>\
    <input type="email" id="Imail" name="Imail" placeholder="Email" ><br>\
    <input type="tel" id="Iphone" name="Iphone" placeholder="Phone" >\
<button type="submit" id="btnSubmit">Submit</button>\
</form>';

var markers = L.layerGroup();

var tmpMarker;

function onMapClick(e) {
    if (tmpMarker) {
        mymap.removeLayer(tmpMarker);
    }
    
    tmpMarker = L.marker(e.latlng, {
        draggable: true
    }).addTo(mymap);

    markers.addLayer(tmpMarker);
    
    tmpMarker.bindPopup(template, {
        maxWidth: "auto"
        });

    tmpMarker.openPopup();

    tmpMarker.on('dragend', function(event){
        var marker = event.target;
        tmpMarker.openPopup();
    });


}


function addPoint() {
    tmpMarker.closePopup();
    markers.addLayer(tmpMarker);
    tmpMarker = null;
    console.log("Add point")
}

mymap.on('click', onMapClick);
