const bcrypt = require("bcryptjs");

const hash = (data) => {
  let salt = bcrypt.genSaltSync(9);
  let hash = bcrypt.hashSync(data, salt);
  return hash;
};

const compare = (data, hash) => {
  return bcrypt.compareSync(data, hash);
};

module.exports = {
  hash,
  compare,
};
