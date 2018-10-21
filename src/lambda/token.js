var axios = require( 'axios');

const endpoint = 'https://us.battle.net/oauth/token?grant_type=client_credentials&client_id='+process.env.CLIENTID+'&client_secret='+process.env.SECRET;

exports.handler = async (event, context, callback) => {
    axios(endpoint)
    .then((realmList) => {
        // console.log(realmList);
    })
    .catch(function(goaway){})

    callback(null, {
        statusCode: 200,
        body: "It sort of works?"
    });
}
