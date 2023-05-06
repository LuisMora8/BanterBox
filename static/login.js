let BASE = "banter-box.herokuapp.com";

function auth_login() {
	username=document.getElementById("email").value
  password = document.getElementById("password").value
	var xhttp = new XMLHttpRequest();
	console.log('/'+username+'/'+password);
  xhttp.open("GET", '/login/'+username+'/'+password);
  xhttp.onload = function() {
     let data = this.responseText;

     if(username=='admin' && data == password){
      // window.alert(data)
		    document.loggedin.action = '/admin/'
		    document.loggedin.submit();
	   }
     //this is to open users thread page
     else{
		    document.loggedin.action = '/loginIntoHome/'+data
        // window.alert(document.loggedin.action)
		    document.loggedin.submit();
	   }
		
  };
  xhttp.send();
}