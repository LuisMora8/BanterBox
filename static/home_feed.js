let BASE = "http://127.0.0.1:5000";
var userurl = ""

// Thread ID and User ID is needed to display thread
function displayHome(id) {
  user_id = id
  var xhttp = new XMLHttpRequest();
  userurl = BASE + "/" + "home/" + user_id;
  xhttp.open("GET", userurl);
  xhttp.onload = function() {
    let data = JSON.parse(this.responseText);
    createHome(data);
  };
  xhttp.send();
}

function createHome(data) {
    let home = '<header><h1>Banter Box</h1></header>';
    home += '<div class="container">'

      // Posts
      data.forEach(post => {
        home += `
        <div class="post">
          <h2>${post.post_header}</h2>
          <p>Posted by ${post.name} | ${post.time}</p>
          <p>${post.post_body}</p>
        </div>`;
      });

      home += '</div>'
      document.getElementById("home").innerHTML = home;
}