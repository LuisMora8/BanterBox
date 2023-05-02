// Registration table
function displayThread() {
  //var xhttp = new XMLHttpRequest();
  
  //xhttp.open("GET",userurl+"/add-courses");
  //xhttp.onload = function() {
    //let data = JSON.parse(this.responseText);
    //createRegistrationTable(data)
  //};
  //xhttp.send();'
  comment1 = {
    "username": "Luis",
    "time": "20h ago",
    "body": "Bruh you for real?",
    "likes": 5
  }

  comment2 = {
    "username": "Abel",
    "time": "21h ago",
    "body": "Autozone, tell them Abel sent you.",
    "likes": 4
  }

  data = {
    "title": "Where can I buy blinker fluid?",
    "img": "static/images/post-pic.png",
    "alt": "posted picture",
    "body": "Like the title says, where can I buy blinker fluid? My lights stopped working.",
    "username": "Erick",
    "comments": [comment1, comment2]
  }

  createThread(data);
}

function createThread(data) {
    let thread = '<div>';
      // Original Post
      thread +=`<div class="post">
      <h1>${data.title}</h1>
      <img src=${data.img} alt${data.alt}>
      <p>${data.body}</p>`;

      // Post A Comment
      thread += `
        <form method="post">
        <p>Comment as: <span id="comment-username">${data.username}</span></p>
          <textarea name="comment-text" id="new-comment" cols="30" rows="10"></textarea>
          <button id="post-button">POST</button>
        </form>`;
      thread += `<div>`

      // Comments
      data.comments.forEach(comment => {
        thread = thread + `
        <div class=comment>
          <p id="comment-username">${comment.username} <span id="comment-time">${comment.time}</span></p>
          <p id="comment-body">${comment.body}</p>
          <span>
            <button id="like"></button>
            ${comment.likes}
            <button id="unlike"></button>
          </span>
        </div>`;
      });

      thread += '</div>'
      document.getElementById("thread").innerHTML = thread;
}