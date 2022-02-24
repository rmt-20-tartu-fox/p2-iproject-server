var bcrypt = require('bcryptjs');

function hashPasword(password){
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash
}

function checkPassword(inputPassword, passwordFromDb){
  const result = bcrypt.compareSync(inputPassword, passwordFromDb);
  return result
}

module.exports = {
  hashPasword,
  checkPassword
}