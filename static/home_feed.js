let BASE = "http://127.0.0.1:5000";
var userurl = ""

function createThread(user_id) {
  userurl = BASE+"/createThread/"+user_id;
  console.log(userurl);
  window.location.href = userurl;
}

function goToThread(thread_id, user_id) {
  userurl = BASE+"/userOpenThread/"+thread_id+"/"+user_id+"/";
  console.log(userurl);
  window.location.href = userurl;
}

function displayHome(id) {
  var xhttp = new XMLHttpRequest();
  userurl = BASE + "/" + "home/" + id;
  xhttp.open("GET", userurl);
  xhttp.onload = function() {
    let data = JSON.parse(this.responseText);
    createHome(data, id);
  };
  xhttp.send();
}

function createHome(data, id) {
    let home = '<header><h1>Banter Box</h1></header>';
    home += '<div class="container">'

    // Create Post
    home += `
    <div>
      <button onclick="createThread(${id})">New Post!</button>
    </div>`


      // Posts
      data.forEach(post => {
        home += `
        <button class="post" onclick="goToThread(${post.id}, ${id})">
          <h2>${post.post_header}</h2>
          <p>Posted by ${post.name} | ${post.time}</p>
          <p>${post.post_body}</p>
        </button>`;
      });

      home += '</div>'
      document.getElementById("home").innerHTML = home;
}