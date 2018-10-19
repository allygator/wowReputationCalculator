'use strict';
const fetch = require("node-fetch");

const endpoint = 'https://us.battle.net/oauth/token?grant_type=client_credentials&client_id='+process.env.CLIENTID+'&client_secret='+process.env.SECRET;

exports.handler = async (event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    body: endpoint
    })
};
