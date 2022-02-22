"use strict";

const bcrypt = require("bcryptjs");

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(plain, encrypted) {
  return bcrypt.compareSync(plain, encrypted);
}

module.exports = {
  hashPassword,
  comparePassword,
};
