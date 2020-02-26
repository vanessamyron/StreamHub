const BASE_URL_TWITCH = "https://api.twitch.tv/helix/streams?user_login=";

//Our API Key/client id for twitch.tv
const CLIENT_ID_TWITCH = "wn4jubf3xbpbk49l089pb1p429qlce";

//An example API call to mixer getting specific channel information
const BASE_URL_MIXER = "https://mixer.com/api/v1/channels/";

//Get the button to add streamer, and run addStreamer() on click
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
		//body: JSON.stringify(user),
	})
	.then((response) => response.json())
	.then((user) => {
		console.log('Success:', user);
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
		//body: JSON.stringify(user),
	})
		.then((response) => response.json())
		.then((user) => {
			console.log('Success:', user);
		})
}