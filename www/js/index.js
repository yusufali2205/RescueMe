
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		Parse.initialize("C0bLelbfQL0dz5zJDOjCqqEYK22n8yXg1tBwfW5P", "HSOuqnO1iTho9JSZM4zNy3rJJaq6fliHaLDx3dGQ");
		emergencyType = "Other";
		head_count = 1;
		
		var emergencyContactNumber = window.localStorage.getItem("emergencyContactNumber");
		if (emergencyContactNumber != null) {
		} else {
			alert("Please select an emergency contact under settings.");
		}
		
		// setting location coordinates as soon as the app starts to raise request fast
		// currLat, currLong will have latitude and longitude
		navigator.geolocation.watchPosition(onLocationSuccess, onLocationError, { timeout: 60000 });
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();