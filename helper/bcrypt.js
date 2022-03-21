const bcrypt = require("bcryptjs")

function encryptPassword(plainPassword) {
  const salt = bcrypt.genSaltSync(8)
  const hash = bcrypt.hashSync(plainPassword, salt)
  return hash
}

function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = { encryptPassword, comparePassword } 