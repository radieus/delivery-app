    /*
    var mymap = L.map('mapid').setView([52.22992817667709, 21.00809365510941], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmFkaWV1cyIsImEiOiJja2dmNjNneTAwdWxwMnZxejY1aGRkdm03In0.FS9_5BuYbcxDQWSTseVO3A'
    }).addTo(mymap);*/

var map = L.map('mapid').setView([52.22992817667709, 21.00809365510941], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmFkaWV1cyIsImEiOiJja2dmNjNneTAwdWxwMnZxejY1aGRkdm03In0.FS9_5BuYbcxDQWSTseVO3A'
    }).addTo(map);

var geocodeService = L.esri.Geocoding.geocodeService();
/*
map.on('click', function(e){
        var coord = e.latlng.toString().split(',');
        var lat = coord[0].split('(');
        var lng = coord[1].split(')');
        alert("You clicked the map at LAT: " + lat[1] + " and LONG: " + lng[0]);
        L.marker(e.latlng,{
            draggable: true,
            autoPan: true
        }).addTo(map);
    });
*/

var markerArray = [];

var nMarkers = 0;
var pointFrom;
var pointTo;

// function onMapClick(e) {
//     var marker = L.marker(e.latlng).addTo(mymap);
//     markerArray.push(marker)
//     marker.bindPopup(template, {
//         maxWidth: "auto"
//       });
//       marker.openPopup;
// }

function onMapClick2(e) {
    
    if(nMarkers < 2) {
        geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
            if (error) {
              return;
            }

            console.log(result);

            var resultStr = result.address;
            var street = result.address.Address;
            var countryCode = result.address.CountryCode;
            var City = result.address.City;
            var postalCode = result.address.Postal;

            if(nMarkers == 1) {
                document.getElementById("IcountryF").value = countryCode;
                document.getElementById("IcityF").value = City;
                document.getElementById("Ifrom").value = street;
                document.getElementById("PCfrom").value = postalCode;
            } else {
                document.getElementById("IcountryD").value = countryCode;
                document.getElementById("IcityD").value = City;
                document.getElementById("Ito").value = street;
                document.getElementById("PCto").value = postalCode;
            }

            nMarkers++;

            var marker = L.marker(result.latlng, {
                    draggable:true,
                    title:"Resource location",
                    alt:"Resource Location",
                    riseOnHover:true
                    }).addTo(map)
                    .bindPopup(result.address.Match_addr).openPopup();

            // #12 : Update marker popup content on changing it's position
            marker.on("dragend",function(e){
                
                var latTrgt = e.target.getLatLng().lat;
                var lngTrgt = e.target.getLatLng().lng;
                this.bindPopup("Latitude:" + latTrgt.toString() + " Longitude:" + lngTrgt.toString()).openPopup();
                var addrInput = document.getElementById("Ifrom").value = latTrgt.toString();
            });
    });
    }
}

function showNewPackageForm() {
    var displayStyle = document.getElementById('newPackageForm').style.display;
    if (displayStyle == "block") {
        document.getElementById('newPackageForm').style.display = "none";
    } else {
        document.getElementById('newPackageForm').style.display = "block";
    }
}

function clearForm() {
    document.getElementById('IcountryF').value = '';
    document.getElementById('IcityF').value = '';
    document.getElementById('Ifrom').value = '';
    document.getElementById('Idate').value = '';
    document.getElementById('Itext').value = '';
    document.getElementById('Iphone').value = '';
    document.getElementById('IcountryD').value = '';
    document.getElementById('IcityD').value = '';
    document.getElementById('Ito').value = '';
    document.getElementById('Isurname').value = '';
    document.getElementById('Iname').value = '';
    document.getElementById('Imail').value = '';
}

document.getElementById("fixedForm").addEventListener("submit", (e) => {
    e.preventDefault();

    var countryFrom = document.getElementById('IcountryF').value;
    var cityFrom = document.getElementById('IcityF').value;
    var originAddress = document.getElementById('Ifrom').value;
    var date = document.getElementById('Idate').value;
    var details = document.getElementById('Itext').value;
    var phone = document.getElementById('Iphone').value;
    var countryTo = document.getElementById('IcountryD').value;
    var cityTo = document.getElementById('IcityD').value;
    var destinationAddress = document.getElementById('Ito').value;
    var surname = document.getElementById('Isurname').value;
    var name = document.getElementById('Iname').value;
    var mail = document.getElementById('Imail').value

    data = {countryFrom, cityFrom, originAddress, date, details, phone, countryTo, countryFrom, cityTo, destinationAddress, surname, name, mail}

    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('/api/', options)
        .then((response) => {
            console.log(response);
            if (response.ok) {
                console.log("OK");
                clearForm();
                count = 0;
            }
            return response.json();
        }).then((data) => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });

});

map.on('click', onMapClick2);
