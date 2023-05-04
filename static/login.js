let BASE = "http://127.0.0.1:5000";

function auth_login() {
	username=document.getElementById("email").value
    password = document.getElementById("password").value
	// if(username=='admin'){
	// 	document.loggedin.action = BASE+'/admin/'
	// 	 document.loggedin.submit();
	// }
	var xhttp = new XMLHttpRequest();
	console.log(BASE+'/'+username+'/'+password)
  xhttp.open("GET", BASE+'/login/'+username+'/'+password);
  xhttp.onload = function() {
     let data = this.responseText;
		 console.log(data);
		 document.loggedin.action = data
		 document.loggedin.submit();
  };
  xhttp.send();
}

//Student

// Display the courses as a table
function displayStudentsCourses(url) {
  var xhttp = new XMLHttpRequest();
	console.log(url);
  xhttp.open(url);
	xhttp.onload = function() {
    // let data = this.responseText;
		// displayStudentsCourses(data)
  };
   xhttp.send();
}

function createScheduleTable(data) {
  let table = '<table id="schedule">';
  table += `<tr><th>Course Name</th><th>Professor</th><th>Time</th><th>Enrollment</th></tr>`;
  data.forEach((data, index) => {
      table = table + `<tr>`;
      table = table + `<td>${data.course}</td>`;
      table = table + `<td>${data.prof}</td>`;
      table = table + `<td>${data.time}</td>`;
      table = table + `<td>${data.enrollment}</td>`;
      table += `</tr>`;
    });
    table += "</table>";
    document.getElementById("courselist").innerHTML = table;
}