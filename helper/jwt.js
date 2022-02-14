var jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET_KEY

function convertToToken(payload){
  const token = jwt.sign({
    data: payload
  }, secret, { expiresIn: 60 * 60 });
  return token
}

function extractToken(token){
  const result = jwt.verify(token, secret);
  return result
}

module.exports = {
  convertToToken,
  extractToken
}