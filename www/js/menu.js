
// need more work here
// so that only one function is required for selecting count and calling setCount function with that count
function raiseCrimeEmergency() {
	emergencyType = 'crime';
	
}

var raiseDisasterEmergency = function() {
	emergencyType = 'disaster';
	
}

var raiseAccidentEmergency = function() {
	emergencyType = 'accident';

}

var raiseMedicalEmergency = function() {
	emergencyType = 'medical';

}

var raiseOtherEmergency = function() {
	emergencyType = 'other';

}

// need more work here
// currently I have made location coordinate variables global so that I can use them here
// fetch emergency contact numbers of the user from database and send text message to them
var sendSMS = function() {
	var emergencyContactNumber = window.localStorage.getItem("emergencyContactNumber");
	var emergencyContactName = window.localStorage.getItem("emergencyContactName");
	var map_link = "http://maps.google.com/?q="+currLat+","+currLong;
	/*
	getting empty string in xmlHttp.responseText
	var addressApiCallLink = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+currLat+","+currLong+"&key=AIzaSyCxM-yONR9_jAtVnxeDDPxPXUmgnRo3Wq8";
	console.log("Calling address api");
	var addressObject = httpGet(addressApiCallLink);
	address = addressObject.results.formatted_address;
	*/
	var message= "I am in an emergency, please help me. My current location: \n" + map_link + "\n\n"
					+	"Current Address: " + address + "\n"
					+	"Emergency type: " + emergencyType + "\n"
					+	"Number of people: " + number_of_people;
	
	//CONFIGURATION
    var options = {
        replaceLineBreaks: true, // true to replace \n by a new line, false by default
        android: {
            //intent: 'INTENT'  // send SMS with the native android SMS messaging
            intent: '' // send SMS without open any other app
        }
    };
	
	var success = function() {
		alert("A text message with location coordinates sent to emergency contact: \n" + emergencyContactName);
	};
	
	var error = function (e) {
		alert("Text message failed with error: " +e);
	};
	
	sms.send(emergencyContactNumber, message, options, success, error);
}


var setCount = function (count) {
	head_count = count;
	
}

var confirmLocation = function () {
	
	// getting user name from database
	var user_name = window.localStorage.getItem("name");
	if (user_name != null){
	} else {
		user_name = "Anonymous";
	}
	
	// vibrate phone for 200 ms to indicate emergency button is pressed.
	navigator.vibrate(200);
	
	// send location to database
	var rescueRequest = new RescueRequest();
	rescueRequest.save({
		user_id: user_name,
		latitude: ""+currLat,
		longitude: ""+currLong,
		request_type: emergencyType,
		number_of_people: head_count
		}, {
			success: function (rescueRequest) {
				alert("A rescue request has been raised");
			},
			error: function (rescueRequest, error) {
				alert("Request failed with error: " + error.code + "\n" + error.message);
			}
	});
	
	
	// call sendSMS() to send text message to emergency contact
	console.log("Calling SMS function");
	var sendMessageConfirmation = confirm("Do you to send a text message to your emergency contact? \nYour carrier will charge you for SMS.");
	if (sendMessageConfirmation) {
		var emergencyContactNumber = window.localStorage.getItem("emergencyContactNumber");
		if (emergencyContactNumber != null) {
			sendSMS();
		} else {
			alert("Please select an emergency contact under settings.");
		}
	}

	appDiv[0].innerHTML = mainPage;
}
