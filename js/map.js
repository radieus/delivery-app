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
    <input type="date" id="IDate" name="IDate" placeholder="Date" ><br>\
    <input type="text" id="Itext" name="Itext" placeholder="Details"><br>\
    <input type="number" id="Iweight" name="Iweight" placeholder="Weight [kg]"><br>\
    <select name="Isize" id="Isize">\
        <option>Small</option>\
        <option>Medium</option>\
        <option>Large</option>\
    </select>\
    <input type="text" id="Iname" name="Iname" placeholder="Name" ><br>\
    <input type="text" id="Isurname" name="Isurname" placeholder="Surame" ><br>\
    <input type="email" id="Imail" name="Imail" placeholder="Email" ><br>\
    <input type="tel" id="Iphone" name="Iphone" placeholder="Phone" >\
<button type="submit" id="btnSubmit">Submit</button>\
</form>';

var markers = L.layerGroup();
var markersDict = {};
var tmpMarker;

var marker;
var clickedMarker;

function onMapClick(e) {
    if (tmpMarker) {
        mymap.removeLayer(tmpMarker);
    }
    
    tmpMarker = L.marker(e.latlng, {
        draggable: true
    }).addTo(mymap); // on('click', onClick)

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

function getValueFromFormOf(marker, elem) {
    return marker.getPopup().getElement().getElementsByTagName("form")[0].getElementsByTagName("input")[elem].value
}

function setValueFromFormOf(marker, elem, val) {
    marker.getPopup().getElement().getElementsByTagName("form")[0].getElementsByTagName("input")[elem].value = val;
}

function addPoint() {

    try {
        markersDict[tmpMarker._leaflet_id] = {
        "IDate" : getValueFromFormOf(tmpMarker, 0),
        "Itext" : getValueFromFormOf(tmpMarker, 1),
        "Iname" : getValueFromFormOf(tmpMarker, 2),
        "Isurname" : getValueFromFormOf(tmpMarker, 3),
        "Imail" : getValueFromFormOf(tmpMarker, 4),
        "tel" : getValueFromFormOf(tmpMarker, 5)
        };

        console.log(markersDict);

        tmpMarker.closePopup();
        markers.addLayer(tmpMarker);
        tmpMarker = null;
        console.log("Add point");
    } catch (error) {
        console.log(error);
    }
}


// function onClick(event) {
//     marker = event.sourceTarget;
//     clickedMarker = event.originalEvent.path[0];

//     console.log(event)
//     for(var item in markersDict) {
//         console.log(marker._leaflet_id);
//         console.log(item);
//         if(marker._leaflet_id == item) {
//             setValueFromFormOf(marker, 0, item["Idate"]);
//             setValueFromFormOf(marker, 1, item["Itext"]);
//             setValueFromFormOf(marker, 2, item["Iname"]);
//             setValueFromFormOf(marker, 3, item["Isurname"]);
//             setValueFromFormOf(marker, 4, item["Imail"]);
//             setValueFromFormOf(marker, 5, item["tel"]);
//         } 
//     }
// };


mymap.on('click', onMapClick);
