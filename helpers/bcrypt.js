const bcrypt = require("bcryptjs");

const passHash = (password) => {
  return bcrypt.hashSync(password, 8);
};

const comparePass = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  passHash,
  comparePass,
};
