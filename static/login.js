let BASE = "http://127.0.0.1:5000";
// let BASE = "https://erick202.pythonanywhere.com/"
function auth_login() {
	username=document.getElementById("email").value
  password = document.getElementById("password").value
	var xhttp = new XMLHttpRequest();
	console.log(BASE+'/'+username+'/'+password);
  xhttp.open("GET", BASE+'/login/'+username+'/'+password);
  xhttp.onload = function() {
     let data = this.responseText;

     if(username=='admin' && data == password){
      // window.alert(data)
		    document.loggedin.action = BASE+'/admin/'
		    document.loggedin.submit();
	   }
     //this is t0o open users thread page
     else{
		    document.loggedin.action = BASE+'/loginIntoHome/'+data
        // window.alert(document.loggedin.action)
		    document.loggedin.submit();
	   }
		
  };
  xhttp.send();
}