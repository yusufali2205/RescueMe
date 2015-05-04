
var getLocation = function() {
    //navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
    //can use watchPosition to get position when change in position is detected.
    //we'll have to use it with a timeout option.
    //navigator.geolocation.watchPosition(onLocationSuccess, onError, { timeout: 30000 } );
}

function onLocationSuccess(position) {
    currLat = position.coords.latitude;
	currLong = position.coords.longitude;
	var positionTimestamp = position.timestamp;
	
	// getting address
	var geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(currLat, currLong);
	geocoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				address = results[0].formatted_address;
			} else { alert("No address found");}
		} else { alert("Request failed, cannot get address"); }
	});
	
	// display latitude, longitude and address on the screen
	document.getElementById("latitude").innerHTML = "Latitude: " + currLat;
	document.getElementById("longitude").innerHTML = "Longitude: " + currLong;
	document.getElementById("address").innerHTML = "Address: " + address;
	
	
	/*
	//set map options
	var mapOptions = {
        center: new google.maps.LatLng(currLat, currLong),
        zoom: 14,
        //mapTypeId: google.maps.MapTypeId.ROADMAP
	};
			
	//create map
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	//show pin on map
	var marker = new google.maps.Marker({
										position: new google.maps.LatLng(currLat, currLong),
										map: map,
										title:"Your location!"
										});
	*/
}

function onLocationError(error) {
    alert("Code: " + error.code + "\n"
        + "Message: " + error.message + "\n");
}
