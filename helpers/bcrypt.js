const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(8)

const hashPassword = password => {
  return bcrypt.hashSync(password, salt)
}

const validatePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
  hashPassword,
  validatePassword
}