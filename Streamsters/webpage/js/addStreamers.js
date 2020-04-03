// $(document).ready(function() {
// 		$("#search").focus(function(){ //To test if streamers has element of active streamers when searching
// 				var full = $("#streamers").has("img").length ? true : false;
// 				if (full == false){
// 						$("#streamers").empty();
// 				}
// 		});
// 		var getName = $("#search").val();
// 		if (getName == ’){
// 				$("#streamers").html("<h2>Please enter text to search.</h2>");
// 		} else {
// 				$("#streamers").html("<h2>Loading streamers</h2>");
// 		}
// });
const BASE_URL_TWITCH = "https://api.twitch.tv/helix/streams?user_login=";

//Our API Key/client id for twitch.tv
const CLIENT_ID_TWITCH = "wn4jubf3xbpbk49l089pb1p429qlce";

//An example API call to mixer getting specific channel information
const BASE_URL_MIXER = "https://mixer.com/api/v1/channels/";

// An API to get user follow
const GET_URL_FOLLOW = "https://api.twitch.tv/kraken/users/<user ID>/follows/channels";

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
	window.open("webpage/index.html", "_blank");
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
	.then((user) =>	console.log('Success:', user);

		//Placing JSON array object into obj for better readability later
		const obj = user.data[0];
		if(obj === undefined) {


			addStreamer("Offline" , document.querySelector("#streamId").value , " " , " ");
		}
		else {
			addStreamer(obj.type, obj.user_name, obj.title ,obj.viewer_count);
			/*
			WOrking on later -
			chrome.runtime.getBackgroundPage(function(backgroundPage) {
				backgroundPage.addToStorage(user,addStreamer(obj.type, obj.user_name, obj.viewer_count));
			});
			*/
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
				addStreamer(user.online, user.token, user.title ,user.viewersCurrent);
				console.log(user.online);
				console.log(user.viewersCurrent);
			}
			else
				console.log("Offline");
		})
}

function addStreamer(status, name, title, viewers){
	let tableRef = document.getElementById("onlineStreamersTable");
	let row = tableRef.insertRow(1);
	let cell1 = row.insertCell(0);
	let cell2 = row.insertCell(1);
	let cell3 = row.insertCell(2);
	let cell4 = row.insertCell(3);
	cell1.innerHTML = status;
	cell2.innerHTML = name;
	cell3.innerHTML = title;
	cell4.innerHTML = viewers;
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
