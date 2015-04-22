

//need more work here
// find a way to pass values into the arguments in onclick functions
// so that only one function is required for raising all kind of emergency requests
var showMenu = function() {
	var appDiv = document.getElementsByClassName("app");
	mainPage = appDiv[0].innerHTML;
	appDiv[0].removeChild(document.getElementById("raiseRequest")); 
	emptyAppDiv = appDiv[0].innerHTML; //storing empty app div                                      
	document.getElementById("message-box").innerHTML = "Select type of emergency";
	appDiv[0].innerHTML = emptyAppDiv
			+ '<div class="event listening button" onclick="raiseCrimeEmergency();">Crime</div>'
			+ '<div class="event listening button" onclick="raiseDisasterEmergency();">Disaster</div>'
			+ '<div class="event listening button" onclick="raiseAccidentEmergency();">Accident</div>'
			+ '<div class="event listening button" onclick="quickRaiseEmergency();">Raise without categoty</div>'
			+ '<div class="event listening button" onclick="goToMainPage();">Go Back</div>';
}

// need more work here
// so that only one function is required for selecting count and calling setCount function with that count
function raiseCrimeEmergency() {
	emergencyType = 'crime';
	
	var appDiv = document.getElementsByClassName("app");
	emergencyTypePage = appDiv[0].innerHTML;
	
	document.getElementById("message-box").innerHTML = "How many people are you?";
	appDiv[0].innerHTML = emptyAppDiv
			+ '<div class="select count button" onclick="setCount(1);">1</div>'
			+ '<div class="select count button" onclick="setCount(2);">2</div>'
			+ '<div class="select count button" onclick="setCount(3);">3</div>'
			+ '<div class="select count button" onclick="setCount(4);">4</div>'
			+ '<div class="select count button" onclick="setCount(5);">5+</div>'
			+ '<div class="event listening button" onclick="goToEmergencyTypePage();">Go Back</div>';
}

var raiseDisasterEmergency = function() {
	alert("Disaster request under maintenance");
}

var raiseAccidentEmergency = function() {
	alert("Accident request under maintenance");
}

var quickRaiseEmergency = function() {
	alert("Quick Emergency request under maintenance");
}

// functions to go to previous pages (Go back buttons)
var goToMainPage = function() {
	var appDiv = document.getElementsByClassName("app");
	appDiv[0].innerHTML = mainPage;
}

var goToEmergencyTypePage = function() {
	var appDiv = document.getElementsByClassName("app");
	appDiv[0].innerHTML = emergencyTypePage;
}

var goToCountPage = function() {
	var appDiv = document.getElementsByClassName("app");
	appDiv[0].innerHTML = countPage;
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
	var message= "Test message. Do not respond!! \nI am in an emergency, please help me. My current location is: \n" + map_link + "\n\nAddress:"
			+ "\n" ;
	
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


// need more work here
// 
var setCount = function (count) {
	head_count = count;
	var appDiv = document.getElementsByClassName("app");
	countPage = appDiv[0].innerHTML;
	document.getElementById("message-box").innerHTML = "Confirm location";
	getLocation();
	appDiv[0].innerHTML = emptyAppDiv
			+ '<div id="map_canvas"></div>'
			+ '<div class="event listening button" onclick="confirmLocation();">Set Location and raise request</div>'
			+ '<div class="event listening button" onclick="goToCountPage();">Go Back</div>';
	
}


var confirmLocation = function () {
	var user_name = window.localStorage.getItem("name");
	
	// send location to database and send notification to all the users for the new request
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
		sendSMS();
	}
	
	alert("Rescue request raised");
	var appDiv = document.getElementsByClassName("app");
	appDiv[0].innerHTML = mainPage;
}

// call to google geocoordinate api to get address from location coordinates 
var httpGet = function (theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


