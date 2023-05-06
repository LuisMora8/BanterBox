let BASE = "http://127.0.0.1:5000";

function signUp() {
	username = document.loggedin.email.value;
  password = document.loggedin.password.value;
  let name = document.loggedin.name.value;
  var pic_name = "";
  const file = new FormData();
  var xhttp = new XMLHttpRequest();
  // Get Photo
  try {
    pic_name = document.loggedin.avatar.files[0].name;
    file.append('file', document.loggedin.avatar.files[0]);
    
  } catch(error) {
    console.log("no photo uploaded")
  }
  file.append('name', name);
  file.append('email',username)
  file.append('password',password)
  file.append('pic_name', pic_name);
  // Post and Open new thread
  userurl = BASE + "/signinUser";
  xhttp.open("POST", userurl);
  xhttp.onload = function() {
    let data = this.responseText;
    userurl = BASE+"/";
		goToThread(userurl);
  };
  xhttp.send(file);
		
  
}
function goToThread(url) {
    console.log(url)
    window.location.href = url;
}