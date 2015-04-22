var settings = function () {
	var appDiv = document.getElementsByClassName("app");
	back_page_from_settings = appDiv[0].innerHTML;
	appDiv[0].innerHTML = '<h3 id="message-box">Settings</h3>'
			+ '<table>'
			+ 	'<tr>'
			+ 		'<td>Name</td> <td id="username" onclick="changeName();">N</td>'
			+ 	'</tr>'
			+ 	'<tr>'
			+ 		'<td>Emergency Contact</td> <td id="emergencyContact" onclick="addEmergencyContact();">E</td>'
			+ 	'</tr>'
			+ 	
			+	'<tr>'
			+ 		'<td class="event listening button" onclick="goBackFromSettings();">Go Back</td>'
			+	'</tr>'
			+ '</table>';
	
	// get name from phones database and display in id="username" tag (display "Anonymous" if name not stored)
	var name = window.localStorage.getItem("name");
	if (name != null) {
		document.getElementById("username").innerHTML =	name;
	} else {
		document.getElementById("username").innerHTML =	"Anonymous";
	}
	
	// get emergency contact from phone's database and display in id="emergencyContact" (display "Select" if not already stored)
	var emergencyContactName = window.localStorage.getItem("emergencyContactName");
	var emergencyContactNumber = window.localStorage.getItem("emergencyContactNumber");
	
	if (emergencyContactName != null & emergencyContactNumber != null ) {
		document.getElementById("emergencyContact").innerHTML = emergencyContactName + ": " + emergencyContactNumber;
	} else {
		document.getElementById("emergencyContact").innerHTML = "Select";
	}
	
}

// return to previous screen from settings screen
var goBackFromSettings = function () {
	var appDiv = document.getElementsByClassName("app");
	appDiv[0].innerHTML = back_page_from_settings;
}

// change text in id="username" to an input
// save name to the phones database
var changeName = function () {
	var namePrompt = prompt("Please enter your name", "");

	if (namePrompt != null) {
		document.getElementById("username").innerHTML =	namePrompt;
		
		// save name to the phones database
		window.localStorage.setItem("name", namePrompt);
	 	alert("Your name saved");
	
	}
	
}

/*
not creating save button, saving name as soon as user press Ok.
// save the name to phone's database on clicking Save button
var saveName = function () {
	alert("Your name updated");
}
*/

// open phonebook to select emergency contact
// display updated emergency contact
var addEmergencyContact = function () {
	//call api to select a contact from the phone
	navigator.contacts.pickContact(getContact, getContactError);
}

// fetch contact name and phone number
// add that contact name and phone number in phone database
var getContact = function(contact){
        var emergencyContactName = contact.name.givenName;
		var emergencyContactNumber = contact.phoneNumbers[0].value;
		console.log('The following contact has been selected:' + JSON.stringify(contact));
		
		if (emergencyContactNumber != null) {
			// display selected contact info
			var emergencyContactTag = document.getElementById("emergencyContact");
			emergencyContactTag.innerHTML = emergencyContactName + ": " + emergencyContactNumber;
			
			// save emergency contact details to phone's database
			window.localStorage.setItem("emergencyContactName", emergencyContactName);
			window.localStorage.setItem("emergencyContactNumber", emergencyContactNumber);
			alert("New emergency contact selected");
		} else {
			alert("Contact does have a phone number, please select another contact");
		}
		
}
	
var getContactError = function(err){
        console.log('Error retrieving contact: ' + err);
    }
