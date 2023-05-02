let BASE = "http://127.0.0.1:5000";
var userurl = ""

function displayThread() {
  thread_id = 102
  user_id = 10
  var xhttp = new XMLHttpRequest();
  userurl += BASE + "/" + thread_id + "/" + user_id;
  xhttp.open("GET", userurl);
  xhttp.onload = function() {
    let data = JSON.parse(this.responseText);
    createProfile(data)
  };
  xhttp.send();

  // comment1 = {
  //   "username": "Luis",
  //   "time": "20h ago",
  //   "body": "Bruh you for real?",
  //   "likes": 5
  // }

  // comment2 = {
  //   "username": "Abel",
  //   "time": "21h ago",
  //   "body": "Autozone, tell them Abel sent you.",
  //   "likes": 4
  // }

  // data = {
  //   "title": "Where can I buy blinker fluid?",
  //   "img": "static/images/post-pic.png",
  //   "alt": "posted picture",
  //   "body": "Like the title says, where can I buy blinker fluid? My lights stopped working.",
  //   "username": "Erick",
  //   "comments": [comment1, comment2]
  // }

  // createThread(data);
}

function createThread(data) {
  let user = data[0];
  let post = data[1];
  let comments = data[2];

    let thread = '<div>';
      // Original Post
      thread +=`<div class="post">
      <h1>${post.header}</h1>`;
      if(post.post_pic != "") {
        thread += `<img src=${post.post_pic}></img>`;
      }
      thread += `<p>${post.body}</p>`;

      // Post A Comment
      thread += `
        <form method="post">
        <p>Comment as: <span id="comment-username">${user.name}</span></p>
          <textarea name="comment-text" id="new-comment" cols="30" rows="10"></textarea>
          <button id="post-button">POST</button>
        </form>`;
      thread += `<div>`

      // Comments
      comments.forEach(comment => {
        thread = thread + `
        <div class=comment>
          <p id="comment-username">${comment.name} <span id="comment-time">2h ago</span></p>
          <p id="comment-body">${comment.body}</p>
          <span>
            <button id="like"></button>
            ${comment.num_likes}
            <button id="unlike"></button>
          </span>
        </div>`;
      });

      thread += '</div>'
      document.getElementById("thread").innerHTML = thread;
}