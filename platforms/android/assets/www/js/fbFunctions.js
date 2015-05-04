var login = function () {
				if (!window.cordova) {
                    var appId = prompt("Enter FB Application ID", "");
                    facebookConnectPlugin.browserInit(appId);
				}
                facebookConnectPlugin.login( ["email"],
                    function (response) { //alert(JSON.stringify(response));
											getFbProfile();
											
										var recordLogin = new RecordLogin();
										recordLogin.save({fbUserID: response.authResponse.userID});
											
                                        var appDiv = document.getElementsByClassName("app");
										loginPage = appDiv[0].innerHTML; //storing login page div elements
										  
                                        },
                    function (response) { alert(JSON.stringify(response)) });
}

var getDOB = function () {
                facebookConnectPlugin.api( "me/?fields=id,email", ["user_birthday"],
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
}

var getFbProfile = function () {
                facebookConnectPlugin.api( "me/?fields=id,name,email,birthday,picture", ["user_birthday"],
                    function (response) { 	alert("Welcome: " + response.name );
											window.localStorage.setItem("name", response.name);
											//alert("DOB: " + response.birthday );
											//alert("Picture: " + response.picture.data.url );
										},
                    function (response) { alert(JSON.stringify(response)) });
}

var getAccessToken = function () {
                facebookConnectPlugin.getAccessToken(
                    function (response) { alert(JSON.stringify(response)) },
                    function (response) { alert(JSON.stringify(response)) });
}

var getStatus = function () {
                facebookConnectPlugin.getLoginStatus(
                    function (response) { return response.status; },
                    function (response) { alert(JSON.stringify(response)) });
}

var logout = function () {
                var confirmLogout = confirm("Are you sure you want to logout?");
				if(confirmLogout==true) {
					facebookConnectPlugin.logout(
						function (response) { 
											var oldAppDiv = document.getElementsByClassName("app");
											oldAppDiv[0].innerHTML = loginPage;
											window.localStorage.setItem("name", "Anonymous");
											},
						function (response) { alert(JSON.stringify(response)) });
				}
}
