var axios = require( 'axios');

const token_endpoint ='https://us.battle.net/oauth/token?grant_type=client_credentials&client_id='+process.env.CLIENTID+'&client_secret='+process.env.SECRET;
const firebase_auth = process.env.FIREBASE_AUTH;
const firebase_url = process.env.FIREBASE_URL;

exports.handler = function(event, context, callback) {
    console.log(token_endpoint);
    console.log(firebase_auth);
    console.log(firebase_url);
    axios(token_endpoint)
        .then((tokenResponse) => {
            var token = tokenResponse.data.access_token;
            axios.post(firebase_auth)
                .then((authResponse) => {
                    var auth = authResponse.data.idToken;
                    const firebase_endpoint = firebase_url+"?auth="+auth
                    axios(firebase_endpoint)
                        .then((databaseResponse) => {
                            var oldtoken = databaseResponse.data;
                            if(oldtoken !== token ) {
                                console.log("Token update");
                                axios.put(firebase_endpoint,{"token":token})
                                .then((res) => {
                                })
                                .catch(function(error){callback(error.message)})
                            }
                        })
                        .catch(function(error){callback(error.message)})
                })
                .catch(function(error){callback(error.message)})
            callback(null, {
                statusCode: 200,
                body: token
            });
        })
        .catch(function(error){callback(error.message)})
}