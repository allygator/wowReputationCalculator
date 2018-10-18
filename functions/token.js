const clientID = process.env.clientID;

exports.handler = async (event, context, callback) => {
    console.log("test");
  return callback(null, {
    statusCode: 200,
    body: clientID;
});
};
