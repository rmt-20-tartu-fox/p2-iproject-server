var jwt = require('jsonwebtoken');
let SECRET_KEY = process.env.SECRET_KEY
function signToken(payload){
  return jwt.sign(payload, SECRET_KEY);
}

function verifyToken(access_token){
  return jwt.verify(access_token, SECRET_KEY);
}

module.exports = {
  signToken,
  verifyToken
}