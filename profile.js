      // Registration table
function displayProfile() {
  //var xhttp = new XMLHttpRequest();
  
  //xhttp.open("GET",userurl+"/add-courses");
  //xhttp.onload = function() {
    //let data = JSON.parse(this.responseText);
    //createRegistrationTable(data)
  //};
  //xhttp.send();'
  post1 = {
    "title": "Where can I get blinker fluid?",
    "posttime": 24,
    "username": "Erick",
    "numcomments": 2
  }

  post2 = {
    "title": "What is a for-loop?",
    "posttime": 30,
    "username": "Erick",
    "numcomments": 20
  }
  
  data = {
    "imgurl": "ryuk.jpeg",
    "username": "Ryuk",
    "posts": [post1,post2]
  }

  createProfile(data);
}

function createProfile(data) {
    let profile = '';
      // User info
      profile += `
      <div class="image-cropper">
        <span>
          <img src=${data.imgurl} alt="profile_photo">
        </span>
      </div>`;
      profile += `
      <div>
        <h2>${data.username}</h2>
        <button>New Post</button>
      </div>`;

      // User's posts
      profile += `<div>`;
      data.posts.forEach(post => {
        profile = profile + `
        <p>
        ${post.title}
        <span>
          ${post.posttime}h ago   asked by ${post.username}   ${post.numcomments} comments
        </span>
        </p>`;
      });

      profile += `</div>`;
      document.getElementById("profile").innerHTML = profile;
}