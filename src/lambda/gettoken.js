var axios = require( 'axios');
const firebase_auth = process.env.FIREBASE_AUTH;
const firebase_url = process.env.FIREBASE_URL;

exports.handler = function(event, context, callback) {
	axios.post(firebase_auth)
		.then((authResponse) => {
			var auth = authResponse.data.idToken;
			const firebase_endpoint = firebase_url+'?auth='+auth;
			return axios(firebase_endpoint);
		})
		.then((databaseResponse) => {
			var token = databaseResponse.data.token;
			callback(null, {
				statusCode: 200,
				body: JSON.stringify({token})
			});
		})
		.catch((error) => callback(error.message));
};
