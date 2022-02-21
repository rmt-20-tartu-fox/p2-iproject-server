var jwt = require('jsonwebtoken');

function signToken(payload){
  return jwt.sign(payload, 'RAINBOW6SIEGE');
}

function verifyToken(access_token){
  return jwt.verify(access_token, 'RAINBOW6SIEGE');
}

module.exports = {
  signToken,
  verifyToken
}