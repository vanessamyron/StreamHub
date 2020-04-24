const BASE_URL_TWITCH = "https://api.twitch.tv/helix/streams?user_login=";

//Our API Key/client id for twitch.tv
const CLIENT_ID_TWITCH = "wn4jubf3xbpbk49l089pb1p429qlce";

//An example API call to mixer getting specific channel information
const BASE_URL_MIXER = "https://mixer.com/api/v1/channels/";

// An API to get user follow
const GET_URL_FOLLOW = "https://api.twitch.tv/kraken/users/<user ID>/follows/channels";

var arr = new Array();


//Get the button to add streamer, and run streamSelected() on click
const addStreamButton = document.getElementById("addStreamButton");
addStreamButton.addEventListener('click', streamSelected);

function streamSelected() {
	let ele = document.getElementsByName('website');

	for(i = 0; i < ele.length; i++) {
		if(ele[i].checked) {
			switch(ele[i].value) {
				case "twitch":
					getStreamerTwitch();
					return;
				case "mixer":
					getStreamerMixer();
					return;
			}
		}
	}

}

//Get the homepage button, and run streamSelected() on click
const button = document.getElementById("homePageButton");
button.addEventListener('click', goHome);

function goHome() {
	window.open("./index.html", "_blank");
}

//Function to get streamer data from Twitch's API
/* Twitch seems to require that the client-id be in the Javascript Header Object, more info on those:
   https://developer.mozilla.org/en-US/docs/Web/API/Headers
   https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch */
async function getStreamerTwitch() {
	const user = document.querySelector("#streamId").value;
	console.log("Calling twitch api for user: " + user);

	fetch(BASE_URL_TWITCH + user, {
		method: 'GET', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
			'Client-ID': CLIENT_ID_TWITCH,
		},
	})
	.then((response) => response.json())
	.then((user) => {
		console.log('Success:', user);

		var tds = document.getElementsByTagName("td");
		var duplicate = false;
		for(var i = 0, j = tds.length; i < j; ++i){
				if(tds[i].innerHTML == document.querySelector("#streamId").value){
						duplicate = true;
				}
		}
		if(!duplicate){
		//Placing JSON array object into obj for better readability later
		const obj = user.data[0];
		if(obj === undefined) {
		//	addStreamer("Offline" , document.querySelector("#streamId").value , " " , " ");
		addDataToLocalStorage("Offline",document.querySelector("#streamId").value, " " , " ");
		}
		else {
		//	addStreamer(obj.type, obj.user_name, obj.title ,obj.viewer_count);
		addDataToLocalStorage(obj.type, obj.user_name, obj.title ,obj.viewer_count);
			/*
			WOrking on later -
			chrome.runtime.getBackgroundPage(function(backgroundPage) {
				backgroundPage.addToStorage(user,addStreamer(obj.type, obj.user_name, obj.viewer_count));
			});
			*/
		}
	}else{
		console.log("User already in list");
	}
	})
}

//Function to get streamer data from Mixer's API
async function getStreamerMixer() {
	const user = document.querySelector("#streamId").value;
	console.log("Calling mixer api for user: " + user);

	fetch(BASE_URL_MIXER + user, {
		method: 'GET', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((user) => {
			console.log('Success:', user);

			//User is already a parsed JSON object, can access data directly and check if user.online === true
			if(user.online === true) {
				//addStreamer(user.online, user.token, user.viewersCurrent);
			  addDataToLocalStorage(user.online, user.token, user.name ,user.viewersCurrent);
				console.log(user.online);
				console.log(user.viewersCurrent);
			}
			else
				console.log("Offline");
		})
}

function addDataToLocalStorage(status, name, title, viewers){
	 getDataFromLocalStorage();
	 arr.push({
		 status1:status,
		 name1:name,
		 title1:title,
		 viewers1:viewers
	 });

	 localStorage.setItem("localData", JSON.stringify(arr))
	 showData();
}



function getDataFromLocalStorage(){
		var str = localStorage.getItem("localData");
		if(str != null)
			arr = JSON.parse(str);
}

function deleteData(){
	localStorage.clear()
}

function showData(){
  getDataFromLocalStorage();
	let tableRef = document.getElementById("onlineStreamersTable");

 var x = tableRef.rows.length;
 while(--x){
	 tableRef.deleteRow(x);
 }

	for(i = 0 ; i < arr.length; i++){
		let row = tableRef.insertRow(1);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		let cell5 = row.insertCell(4);


		var tds = document.getElementsByTagName("td");
		let btn = document.createElement("button");
		btn.innerHTML = "<img src='./photos/plus.png' alt='Add streamers button.'>";
		cell5.appendChild(btn);

	if(status == "Offline"){
		tds[0].style.color = "#FF0000";
		cell1.innerHTML = arr[i].status1;
		cell2.innerHTML = arr[i].name1;
		cell3.innerHTML = arr[i].title1;
		cell4.innerHTML = arr[i].viewers1;
	}else{

		tds[0].style.color = "#008000";
		cell1.innerHTML = arr[i].status1;
		cell2.innerHTML = arr[i].name1;
		cell3.innerHTML =arr[i].title1;
		cell4.innerHTML = arr[i].viewers1;
	}
}
}


//Function to sort the table by headers where n is the column # starting with 0
function sortTable(n){
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("onlineStreamersTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}



function getFollowers(name){
return new Promise((resolve,reject) => {
	request({GET_URL_FOLLOW, json: true }, (err,resp,body) => {
		if(err == true){
			reject(err)
	}

		const PEOPLE_FOLLOWERS = body.follows.map(follower => {
			return { id: follower.user.id, name: follower.user.name }
		})
				resolve(PEOPLE_FOLLOWERS)
	})
})

}
