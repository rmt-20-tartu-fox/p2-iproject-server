const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(4);

const passwordHasher = (password) => {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const passwordComparer = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { passwordHasher, passwordComparer };
