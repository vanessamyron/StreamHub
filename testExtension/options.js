const BASE_URL_TWITCH = "https://api.twitch.tv/helix/streams?user_login=";

//Our API Key/client id for twitch.tv
const CLIENT_ID_TWITCH = "wn4jubf3xbpbk49l089pb1p429qlce";
//Another test API key for twitch.tv
//const CLIENT_ID_TWITCH = "tn2qigcd7zaj1ivt1xbhw0fl2y99c4y";

//An example API call to mixer getting specific channel information
const BASE_URL_MIXER = "https://mixer.com/api/v1/channels/";

//Get the button to add streamer, and run streamSelected() on click
const button = document.querySelector("button");
button.addEventListener('click', streamSelected);

function streamSelected() {
	let ele = document.getElementsByName('website');

	for(i = 0; i < ele.length; i++) {
		if(ele[i].checked) {
			if(ele[i].value === "twitch") getStreamerTwitch();
			if(ele[i].value === "mixer") getStreamerMixer();
		}
	}
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

		//Placing JSON array object into obj for better readability later
		const obj = user.data[0];
		if(obj === undefined) {
			console.log("Offline");
		}
		else {
			console.log(obj.type);
			console.log(obj.viewer_count);
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
				console.log(user.online);
				console.log(user.viewersCurrent);
			}
			else
				console.log("Offline");
		})
}