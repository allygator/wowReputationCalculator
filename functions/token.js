const clientID = process.env.CLIENTID

exports.handler = async (event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    body: clientID
    })
};
