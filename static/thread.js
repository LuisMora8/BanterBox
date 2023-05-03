let BASE = "http://127.0.0.1:5000";
var userurl = ""

// Post a new comment
function postComment() {
  thread_id = 102;
  user_id = 10;
  var new_comment = new FormData(document.getElementById("post-comment"));
  var comment_body = new_comment.get("comment-text");
  const body = {"comment_body": comment_body};
  var xhttp = new XMLHttpRequest();
  userurl = BASE + "/" + "thread" + thread_id + "/" + user_id;
  xhttp.open("POST", userurl);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onload = function() {
    let data = JSON.parse(this.responseText);
  };
  xhttp.send(JSON.stringify(body));
}

// Thread ID and User ID is needed to display thread
function displayThread() {
  thread_id = 102
  user_id = 10
  var xhttp = new XMLHttpRequest();
  userurl = BASE + "/" + "thread" + thread_id + "/" + user_id;
  xhttp.open("GET", userurl);
  xhttp.onload = function() {
    let data = JSON.parse(this.responseText);
    createThread(data)
  };
  xhttp.send();
}

// Input is an array of dictionaries
// data[0] is the user info
// post[1] is the post info
// post[2] is the comments info
function createThread(data) {
  let user = data[0];
  let post = data[1];
  let comments = data[2];
  console.log(post.post_header)

    let thread = '<div>';
      // Original Post
      thread +=`<div class="post">
      <h1>${post.post_header}</h1>`;
      if(post.post_pic != "") {
        thread += `<img src=${post.post_pic}></img>`;
      }
      thread += `<p>${post.post_body}</p>`;

      // Post A Comment
      thread += `
        <form id="post-comment">
        <p>Comment as: <span id="comment-username">${user.name}</span></p>
          <textarea name="comment-text" id="new-comment" cols="30" rows="10"></textarea>
          <button type="submit" id="post-button" onclick="postComment()">POST</button>
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