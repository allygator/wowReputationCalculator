const client = process.env.clientID;
const secret = process.env.secret;

exports.handler = function(event, context, callback) {
    return {
    statusCode: 200,
    body: client
    });
}
