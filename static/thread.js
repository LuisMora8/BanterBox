let BASE = "banter-box.herokuapp.com";
var userurl = ""

// Like a comment
function likeComment(button, comment_id, user_id) {
  var xhttp = new XMLHttpRequest();
  const body = {"comment_id": comment_id, "user_id": user_id};
  userurl = "/like-comment";

  if(button.id == "liked") {
    button.id = "like";
    xhttp.open("DELETE", userurl);
  } else {
    button.id = "liked";
    xhttp.open("POST", userurl);
  }

  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onload = function() {
    document.getElementById(comment_id).innerHTML = this.responseText;
  };
  xhttp.send(JSON.stringify(body));
}

// Post a New Comment
function postComment(user_id, thread_id) {
  var new_comment = new FormData(document.getElementById("post-comment"));
  var comment_body = new_comment.get("comment-text");
  const body = {"comment_body": comment_body};
  var xhttp = new XMLHttpRequest();
  userurl = "/" + "thread" + thread_id + "/" + user_id;
  xhttp.open("POST", userurl);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onload = function() {
    let data = JSON.parse(this.responseText);
  };
  xhttp.send(JSON.stringify(body));
}

// Thread ID and User ID is needed to display thread
function displayThread(id,threadId) {
  thread_id = threadId
  user_id = id
  var xhttp = new XMLHttpRequest();
  userurl = "/" + "thread" + thread_id + "/" + user_id;
  xhttp.open("GET", userurl);
  xhttp.onload = function() {
    let data = JSON.parse(this.responseText);
    createThread(data)
  };
  xhttp.send();
}

function createThread(data) {
  // Input is an array of dictionaries
  // data[0] is the user info
  let user = data[0];
  // post[1] is the post info
  let post = data[1];
  // post[2] is the comments info
  let comments = data[2];
  console.log(post.post_header)

    let thread = '<div><center>';
      // Original Post
      thread +=`<div class="post">
      <h1>${post.post_header}</h1>`;
      if(post.post_pic != "") {
        console.log(post.post_pic);
        thread += `<img src=/static/images/${post.post_pic}></img>`;
      }
      thread += `<p>${post.post_body}</p>`;
      thread += `<p>Asked by: ${post.name} | ${post.time}</p>`;
      

      // Post A Comment
      thread += `
        <form id="post-comment">
        <p>Comment as: <span id="comment-username">${user.name}</span></p>
          <textarea name="comment-text" id="new-comment" cols="50" rows="5"></textarea>
          <button type="submit" id="post-button" onclick="postComment(${user.id}, ${post.id})">POST</button>
        </form>`;
      thread += `<div>`

      // Comments
      comments.forEach(comment => {
        thread += `
        <div class=comment>
          <p id="comment-username">${comment.name} <span id="comment-time">${comment.time}</span></p>
          <p id="comment-body">${comment.body}</p>
          <span>`;
          
        if (comment.liked_by_user) {
          thread += `<button id="liked" onclick="likeComment(this, ${comment.id}, ${user.id})"></button>`;
        } else {  
          thread += `<button id="like" onclick="likeComment(this, ${comment.id}, ${user.id})"></button>`;
        }
          thread += 
            `<span id="${comment.id}">${comment.num_likes}</span>
          </span>
        </div>`;
      });

      thread += '</center></div>'
      document.getElementById("thread").innerHTML = thread;
}