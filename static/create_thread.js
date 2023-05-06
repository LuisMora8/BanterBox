let BASE = "banter-box.herokuapp.com";
var userurl = ""

function postThread(user_id) {
  let header = document.new_post.title.value;
  let body = document.new_post.message.value;
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
  file.append('user_id', user_id);
  file.append('header', header);
  file.append('body', body);
  file.append('pic_name', pic_name);
  // Post and Open new thread
  userurl = "/upload";
  xhttp.open("POST", userurl);
  xhttp.onload = function() {
    let data = this.responseText;
    userurl = data;
		goToThread(userurl);
  };
  xhttp.send(file);
}

function goToThread(url) {
  console.log(url)
  window.location.href = url;
}