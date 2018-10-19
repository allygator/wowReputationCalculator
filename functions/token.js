const clientID = process.env.CLIENTID;
const secret = process.env.SECRET;

exports.handler = async (event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    body: secret
    })
};
