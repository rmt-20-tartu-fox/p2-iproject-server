const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const convertPayloadToToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h"
  });
};

const convertTokenToPlayload = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { convertPayloadToToken, convertTokenToPlayload };