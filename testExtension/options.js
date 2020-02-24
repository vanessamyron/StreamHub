const BASE_URL_TWITCH = "https://api.twitch.tv/helix";

//Our API Key/client id for twitch.tv
const CLIENT_ID_TWITCH = "wn4jubf3xbpbk49l089pb1p429qlce";

//An example API call to mixer getting specific channel information
const TEST_URL = "https://mixer.com/api/v1/channels/misterjoker";


async function getData() {

	const response = await fetch(TEST_URL);
	//Convert response into json
	const data = await response.json();
	//Print data to console
	console.log(data);
}

getData();
