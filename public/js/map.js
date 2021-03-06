var btnOr = document.getElementById("geocodeOrigin");
var btnDst = document.getElementById("geocodeDest");
var btnUpdate = document.getElementById("btnUpdate");

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

var markerArray = [];
var nMarkers = 0;
var pointFrom;
var pointTo;
var packageId;

function onMapClick(e) {
    
    if(nMarkers < 2) {
        geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
            if (error) {
              return;
            }

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
                    }).on('click', markerOnClick)
                    .addTo(map)
                    .bindPopup(result.address.Match_addr).openPopup();

            markerArray.push(marker)

            // #12 : Update marker popup content on changing it's position
            marker.on("dragend",function(e){
                geocodeService.reverse().latlng(e.target.getLatLng()).run(function (error, res) {
                    marker.bindPopup(e.target.getLatLng().toString()).openPopup();
                    if (marker == markerArray[0]){
                        document.getElementById("IcountryD").value = res.address.CountryCode;
                        document.getElementById("IcityD").value = res.address.City;
                        document.getElementById("Ito").value = res.address.Address;
                        document.getElementById("PCto").value = res.address.Postal;
                    } else {
                        document.getElementById("IcountryF").value = res.address.CountryCode;
                        document.getElementById("IcityF").value = res.address.City;
                        document.getElementById("Ifrom").value = res.address.Address;
                        document.getElementById("PCfrom").value = res.address.Postal;
                    }
                });
            });
        });
    }
}

function markerOnClick(e) {
    
}

function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            var address = (results[0].formatted_address);
            var addrInput = document.getElementById("Ifrom");
            addrInput.value = address;
        }
    });
}

function clearForm() {
    document.getElementById('IcountryF').value = '';
    document.getElementById('IcityF').value = '';
    document.getElementById('Ifrom').value = '';
    document.getElementById('Idate').value = '';
    document.getElementById('PCfrom').value = '';
    document.getElementById('PCto').value = '';
    document.getElementById('Itext').value = '';
    document.getElementById('Iphone').value = '';
    document.getElementById('IcountryD').value = '';
    document.getElementById('IcityD').value = '';
    document.getElementById('Ito').value = '';
    document.getElementById('Isurname').value = '';
    document.getElementById('Iname').value = '';
    document.getElementById('Imail').value = '';
}

function geocodeOriginBtn(){
    var text = "";
    var country = document.getElementById("IcountryF").value;
    var city = document.getElementById("IcityF").value;
    var PostalCode = document.getElementById("PCfrom").value;
    var street = document.getElementById("Ifrom").value;
    text = street.toString() + ", " + city.toString() + ", " + country.toString();

    console.log(text);

    L.esri.Geocoding.geocode().text(text).run(function (err, results, response) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(results.results[0]);

        if (nMarkers < 2) {
            var marker = L.marker(results.results[0].latlng, {
            draggable:true,
            title:"Resource location",
            alt:"Resource Location",
            riseOnHover:true
            }).on('click', markerOnClick)
            .addTo(map)
            .bindPopup(results.results[0].text).openPopup();

            markerArray.push(marker);
            nMarkers++;
            console.log(markerArray.length)

            marker.on("dragend",function(e){
                geocodeService.reverse().latlng(e.target.getLatLng()).run(function (error, res) {
                    marker.bindPopup(e.target.getLatLng().toString()).openPopup();
                    if (marker == markerArray[0]){
                        document.getElementById("IcountryD").value = res.address.CountryCode;
                        document.getElementById("IcityD").value = res.address.City;
                        document.getElementById("Ito").value = res.address.Address;
                        document.getElementById("PCto").value = res.address.Postal;
                    } else {
                        document.getElementById("IcountryF").value = res.address.CountryCode;
                        document.getElementById("IcityF").value = res.address.City;
                        document.getElementById("Ifrom").value = res.address.Address;
                        document.getElementById("PCfrom").value = res.address.Postal;
                    }
                });
            });
        }
      });
}

function geocodeDestBtn(){
    var text = "";
    var country = document.getElementById("IcountryD").value;
    var city = document.getElementById("IcityD").value;
    var PostalCode = document.getElementById("PCto").value;
    var street = document.getElementById("Ito").value;
    text = street.toString() + ", " + city.toString() + ", " + country.toString();

    console.log(text);

    L.esri.Geocoding.geocode().text(text).run(function (err, results, response) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(results);

        if (nMarkers < 2) {
            var marker = L.marker(results.results[0].latlng, {
            draggable:true,
            title:"Resource location",
            alt:"Resource Location",
            riseOnHover:true
            }).on('click', markerOnClick)
            .addTo(map)
            .bindPopup(results.results[0].text).openPopup();

            markerArray.push(marker);
            nMarkers++;
            console.log(markerArray.length)

            marker.on("dragend",function(e){
                geocodeService.reverse().latlng(e.target.getLatLng()).run(function (error, res) {
                    marker.bindPopup(e.target.getLatLng().toString()).openPopup();
                    if (marker == markerArray[0]){
                        document.getElementById("IcountryD").value = res.address.CountryCode;
                        document.getElementById("IcityD").value = res.address.City;
                        document.getElementById("Ito").value = res.address.Address;
                        document.getElementById("PCto").value = res.address.Postal;
                    } else {
                        document.getElementById("IcountryF").value = res.address.CountryCode;
                        document.getElementById("IcityF").value = res.address.City;
                        document.getElementById("Ifrom").value = res.address.Address;
                        document.getElementById("PCfrom").value = res.address.Postal;
                    }
                });
            });
        }
    });
}

document.getElementById("fixedForm").addEventListener("submit", (e) => {
    e.preventDefault();

    var countryFrom = document.getElementById('IcountryF').value;
    var cityFrom = document.getElementById('IcityF').value;
    var postCodeFrom = document.getElementById('PCfrom').value;
    var originAddress = document.getElementById('Ifrom').value;
    var date = document.getElementById('Idate').value;
    var details = document.getElementById('Itext').value;
    var phone = document.getElementById('Iphone').value;
    var countryTo = document.getElementById('IcountryD').value;
    var cityTo = document.getElementById('IcityD').value;
    var postCodeTo = document.getElementById('PCto').value;
    var destinationAddress = document.getElementById('Ito').value;
    var surname = document.getElementById('Isurname').value;
    var name = document.getElementById('Iname').value;
    var mail = document.getElementById('Imail').value;
    var destinationLatlng = markerArray[0]._latlng;
    var originLatlng = markerArray[1]._latlng;

    data = {countryFrom, cityFrom, postCodeFrom, originAddress, originLatlng, date, details, phone, countryTo, countryFrom, cityTo, postCodeTo, destinationAddress, destinationLatlng, surname, name, mail}

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
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            if (data) {
                //updateDeliveries(data);
            }
        }).catch(error => {
            console.log(error);
        });
});

function updateDeliveries(data) {

    markerArray = [];

    if (data) {
        var markerD = L.marker(L.latLng(
            parseFloat(data.destinationLatlng.lat),
            parseFloat(data.destinationLatlng.lng)
        ), {
            draggable:true,
            title:"Resource location",
            alt:"Resource Location",
            riseOnHover:true
            }).on('click', markerOnClick)
            .addTo(map);
            //.bindPopup(data.destinationLatlng).openPopup();

        // #12 : Update marker popup content on changing it's position
        markerD.on("dragend",function(e){
            geocodeService.reverse().latlng(e.target.getLatLng()).run(function (error, res) {
                markerD.bindPopup(e.target.getLatLng().toString()).openPopup();
                if (markerD == markerArray[0]){
                    document.getElementById("IcountryD").value = res.address.CountryCode;
                    document.getElementById("IcityD").value = res.address.City;
                    document.getElementById("Ito").value = res.address.Address;
                    document.getElementById("PCto").value = res.address.Postal;
                } else {
                    document.getElementById("IcountryF").value = res.address.CountryCode;
                    document.getElementById("IcityF").value = res.address.City;
                    document.getElementById("Ifrom").value = res.address.Address;
                    document.getElementById("PCfrom").value = res.address.Postal;
                }
            });
        });

        markerArray.push(markerD)

        var markerO = L.marker(L.latLng(
            parseFloat(data.originLatlng.lat),
            parseFloat(data.originLatlng.lng)
        ), {
            draggable:true,
            title:"Resource location",
            alt:"Resource Location",
            riseOnHover:true
            }).on('click', markerOnClick)
            .addTo(map);
            //.bindPopup(data.originLatlng).openPopup();

        // #12 : Update marker popup content on changing it's position
        markerO.on("dragend",function(e){
            geocodeService.reverse().latlng(e.target.getLatLng()).run(function (error, res) {
                markerO.bindPopup(e.target.getLatLng().toString()).openPopup();
                if (markerO == markerArray[0]){
                    document.getElementById("IcountryD").value = res.address.CountryCode;
                    document.getElementById("IcityD").value = res.address.City;
                    document.getElementById("Ito").value = res.address.Address;
                    document.getElementById("PCto").value = res.address.Postal;
                } else {
                    console.log(markerO);
                    console.log(markerArray[0]);
                    document.getElementById("IcountryF").value = res.address.CountryCode;
                    document.getElementById("IcityF").value = res.address.City;
                    document.getElementById("Ifrom").value = res.address.Address;
                    document.getElementById("PCfrom").value = res.address.Postal;
                }
            });
        });

        markerArray.push(markerO)

        document.getElementById('IcountryF').value = data.countryFrom;
        document.getElementById('IcityF').value = data.cityFrom;
        document.getElementById('Ifrom').value = data.originAddress;
        document.getElementById('Idate').value = data.date;
        document.getElementById('PCfrom').value = data.postCodeFrom;
        document.getElementById('PCto').value = data.postCodeTo;
        document.getElementById('Itext').value = data.details;
        document.getElementById('Iphone').value = data.phone;
        document.getElementById('IcountryD').value = data.countryTo;
        document.getElementById('IcityD').value = data.cityTo;
        document.getElementById('Ito').value = data.destinationAddress;
        document.getElementById('Isurname').value = data.surname;
        document.getElementById('Iname').value = data.name;
        document.getElementById('Imail').value = data.mail;

        nMarkers = 2;
    }
}

window.onload = async function() {
    fetch('/api/deliveries/', {
        method: 'GET'
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        updateDeliveries(data[0]);
        packageId = data[0].id;
    }).then(error => console.log(error));
}

function updatePackage(e) {
    e.preventDefault();

    var countryFrom = document.getElementById('IcountryF').value;
    var cityFrom = document.getElementById('IcityF').value;
    var postCodeFrom = document.getElementById('PCfrom').value;
    var originAddress = document.getElementById('Ifrom').value;
    var date = document.getElementById('Idate').value;
    var details = document.getElementById('Itext').value;
    var phone = document.getElementById('Iphone').value;
    var countryTo = document.getElementById('IcountryD').value;
    var cityTo = document.getElementById('IcityD').value;
    var postCodeTo = document.getElementById('PCto').value;
    var destinationAddress = document.getElementById('Ito').value;
    var surname = document.getElementById('Isurname').value;
    var name = document.getElementById('Iname').value;
    var mail = document.getElementById('Imail').value;
    var destinationLatlng = markerArray[0]._latlng;
    var originLatlng = markerArray[1]._latlng;

    data = {countryFrom, cityFrom, postCodeFrom, originAddress, originLatlng, date, details, phone, countryTo, countryFrom, cityTo, postCodeTo, destinationAddress, destinationLatlng, surname, name, mail}

    options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(data)
    }
    console.log("package id below");
    console.log(packageId);
    fetch(`/api/deliveries/${packageId}`, options
    ).then((res) => {
        return res.json();
    });

    clearForm();
}

btnOr.addEventListener('click', geocodeOriginBtn);
btnDst.addEventListener('click', geocodeDestBtn);
btnUpdate.addEventListener('click', updatePackage);

map.on('click', onMapClick);