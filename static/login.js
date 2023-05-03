let BASE = "http://127.0.0.1:5000";

function auth_login() {
	username=document.getElementById("email").value
	if(username=='admin'){
		document.loggedin.action = BASE+'/admin/'
		 document.loggedin.submit();
	}
	var xhttp = new XMLHttpRequest();
	console.log(BASE+'/'+username)
  xhttp.open("GET", BASE+'/'+username);
  xhttp.onload = function() {
     let data = this.responseText;
		 console.log(data);
		 document.loggedin.action = data
		 document.loggedin.submit();
  };
  xhttp.send();
}

