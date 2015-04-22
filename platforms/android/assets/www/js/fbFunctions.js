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
											
                                          document.getElementById("message-box").innerHTML = "Welcome";
                                          var appDiv = document.getElementsByClassName("app");
										  loginPage = appDiv[0].innerHTML; //storing login page div elements
										  appDiv[0].removeChild(document.getElementById("fbLogin")); 
										  emptyAppDiv = appDiv[0].innerHTML; //storing empty app div
                                          appDiv[0].innerHTML = appDiv[0].innerHTML
												+ '<div class="event listening button" onclick="call911();">Call 911</div>'
												+ '<div id="fbLogout" class="event listening button" onclick="logout();">Logout with Facebook</div>';
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
                    function (response) { 	alert("Name: " + response.name );
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
						function (response) { document.getElementById("message-box").innerHTML = "Thank you";
											var oldAppDiv = document.getElementsByClassName("app");
											oldAppDiv[0].innerHTML = loginPage;
											},
						function (response) { alert(JSON.stringify(response)) });
				}
}
