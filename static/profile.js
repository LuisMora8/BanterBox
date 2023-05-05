let BASE = "http://127.0.0.1:5000";
var userurl = ""

function goToThread(thread_id, user_id) {
  userurl = BASE+"/userOpenThread/"+thread_id+"/"+user_id+"/";
  console.log(userurl);
  window.location.href = userurl;
}

function displayProfile(userid) {
  var xhttp = new XMLHttpRequest();
  userurl += BASE + "/" + userid;
  xhttp.open("GET", userurl+"/profile/");
  xhttp.onload = function() {
    let data = JSON.parse(this.responseText);
    createProfile(data)
  };
  xhttp.send();
}

function createProfile(data) {
  userdata = data[0];
  posts = data[1];
    let profile = '';
      // User info
      profile += `
      <div class="image-cropper">
        <span>
          <img src="/${userdata.profile_pic}" alt="profile_photo">
        </span>
      </div>`;
      profile += `
      <div>
        <h2>${userdata.name}</h2>
        <p>Member since: ${userdata.time}</p>
        <button>New Post</button>
      </div>`;

      profile += `<div>`;
      // User's posts
      posts.forEach(post => {
        profile = profile + `
        <button class="post" onclick="goToThread(${post.id}, ${post.user_id})">
        <h2>${post.post_header}</h2>
        <p>
        <span>
          ${post.time} | asked by ${userdata.name} | ${12} comments
        </span>
        </p>
        <p>
          ${post.post_body}
        </p>
        </button>`;
      });

      profile += `</div>`;
      document.getElementById("profile").innerHTML = profile;
}