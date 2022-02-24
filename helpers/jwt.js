const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const signToken = (payload) => {
  return jwt.sign(payload, secret);
};

const decodeToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  signToken,
  decodeToken,
};
