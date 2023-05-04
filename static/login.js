let BASE = "http://127.0.0.1:5000";

function auth_login() {
	username=document.getElementById("email").value
    password = document.getElementById("password").value
	// if(username=='admin'){
	// 	document.loggedin.action = BASE+'/admin/'
  //   window.alert(document.loggedin.action)
	// 	 document.loggedin.submit();
	// }
	var xhttp = new XMLHttpRequest();
	console.log(BASE+'/'+username+'/'+password)
  xhttp.open("GET", BASE+'/login/'+username+'/'+password);
  xhttp.onload = function() {
     let data = this.responseText;
    //  console.log(data);
    //  window.alert(data)
     if(username=='admin' && data == password){
      // window.alert(data)
		    document.loggedin.action = BASE+'/admin/'
        // window.alert(document.loggedin.action)
		    document.loggedin.submit();
	   }
     //this is to open users thread page
    //  else if( data == password){
    //   window.alert(data)
		//     document.loggedin.action = BASE+'/'+username+'/'+data+'/'
    //     window.alert(document.loggedin.action)
		//     document.loggedin.submit();
	  //  }
		
  };
  xhttp.send();
}

