const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const secretkey = 'gaamantapigpp'

const signToken = (payload) => {
  return jwt.sign(payload, secretkey)
}
const tokenToPayload = (token) => {
  return jwt.verify(token, secretkey)
}
const comparePassword = (password, hashed) => {
  return bcrypt.compareSync(password, hashed)
}

module.exports = { signToken, tokenToPayload, comparePassword }