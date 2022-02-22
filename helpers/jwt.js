const jwt = require("jsonwebtoken");
const SECRET_KEY = "thisSecret";

const signToken = (paylaod) => {
  return jwt.sign(paylaod, SECRET_KEY);
};

const convToPayload = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  signToken,
  convToPayload,
};
