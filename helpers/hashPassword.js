const bcrypt = require("bcrypt")

function hashPass(password) {
  const salt = bcrypt.genSaltSync(8)
  return bcrypt.hashSync(password, salt)
}

function comparePass(plainPass, hashedPass) {
  return bcrypt.compareSync(plainPass,hashedPass)
}

module.exports = {
  hashPass,
  comparePass
}