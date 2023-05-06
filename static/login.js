let BASE = "banter-box.herokuapp.com";

function auth_login() {
  const file = new FormData();
	file.append('username', document.getElementById("email").value);
  file.append('password', document.getElementById("password").value);
	var xhttp = new XMLHttpRequest();
	//console.log('/'+username+'/'+password);
  xhttp.open("POST", '/login/');
  xhttp.onload = function() {
     let data = this.responseText;

     if(document.getElementById("email").value=='admin' && data == "success"){
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
  console.log(file)
  xhttp.send(file);
}

