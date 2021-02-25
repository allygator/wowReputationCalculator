var axios = require("axios");

const token_endpoint =
	"https://us.battle.net/oauth/token?grant_type=client_credentials&client_id=" +
	process.env.CLIENTID +
	"&client_secret=" +
	process.env.SECRET;
const firebase_auth = process.env.FIREBASE_AUTH;
const firebase_url = process.env.FIREBASE_URL;

exports.handler = function (event, context, callback) {
	let token;
	let firebase_endpoint;
	axios
		.post(token_endpoint)
		.then((tokenResponse) => {
			token = tokenResponse.data.access_token;
			return axios.post(firebase_auth);
		})
		.then((authResponse) => {
			let auth = authResponse.data.idToken;
			firebase_endpoint = firebase_url + "?auth=" + auth;
			return axios(firebase_endpoint);
		})
		.then((databaseResponse) => {
			let oldtoken = databaseResponse.data.token;
			if (oldtoken !== token) {
				console.log("Token updated");
				axios
					.put(firebase_endpoint, { token: token })
					.then((res) => {})
					.catch(function (error) {
						callback(error.message);
					});
			}
		})
		.then((response) => {
			callback(null, {
				statusCode: 200,
				body: "You're not supposed to be here.",
			});
		})
		.catch((error) => callback(error.message));
};
