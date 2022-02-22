const jwt = require('jsonwebtoken')
const SECRET_KEY = "wirantoprabowo"

const tokenGenerator = (payload)  => {
  return jwt.sign(payload, SECRET_KEY)
}
const tokenConverter = (token) => {
  return jwt.verify(token, SECRET_KEY)
}

module.exports = { tokenGenerator, tokenConverter };