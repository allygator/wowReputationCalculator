const clientID = process.env.clientID;

exports.handler = async (event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    body: clientID;
    })
};
