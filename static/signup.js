let BASE = "http://127.0.0.1:5000";
// let BASE = "https://erick202.pythonanywhere.com/"
function signUp() {
	username=document.getElementById("email").value
  password = document.getElementById("password").value
  let name = document.new_post.name.value;
  var pic_name = "";
  const file = new FormData();
  var xhttp = new XMLHttpRequest();
  // Get Photo
  try {
    pic_name = document.new_post.avatar.files[0].name;
    file.append('file', document.new_post.avatar.files[0]) ;
    
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
    userurl = BASE+"/login";
		goToThread(userurl);
  };
  xhttp.send(file);
		
  
}
function goToThread(url) {
    console.log(url)
    window.location.href = url;
}