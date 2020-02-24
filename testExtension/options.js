const BASE_URL_TWITCH = "https://api.twitch.tv/helix";

//Our API Key/client id for twitch.tv
const CLIENT_ID_TWITCH = "wn4jubf3xbpbk49l089pb1p429qlce";

const TEST_URL = "https://api.wheretheiss.at/v1/satellites/25544";


async function getData() {

	const response = await fetch(TEST_URL);
	//Convert response into json
	const data = await response.json();
	//Print data to console
	console.log(data);
}

getData();
