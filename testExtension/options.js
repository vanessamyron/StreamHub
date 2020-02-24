const BASE_URL_TWITCH = "https://api.twitch.tv/helix";

//Our API Key/client id for twitch.tv
const CLIENT_ID_TWITCH = "wn4jubf3xbpbk49l089pb1p429qlce";

//An example API call to mixer getting specific channel information
const BASE_URL_MIXER = "https://mixer.com/api/v1/channels/";

//Get the button to add streamer, and run addStreamer() on click
const button = document.querySelector('button');
button.addEventListener('click', getStreamer);

//Function to get streamer data from Mixer's API
function getStreamer() {
	const user = document.querySelector("#streamId").value;
	console.log(user);

	//Need to deal with promise
	getData(user);
}

//Get data from Mixer API based on streamer user name
async function getData(userId) {

	const response = await fetch(BASE_URL_MIXER + userId);
	//Convert response into json
	const data = await response.json();
	//Print data to console
	console.log(data);
}

//Commented out to avoid constantly calling API during testing
//getData();
