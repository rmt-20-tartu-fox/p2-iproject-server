const bcrypt = require("bcryptjs");

class Helper {
  static errors(err) {
    const error = err.errors.map((el) => el.message);

    return error;
  }

  static bcrypt(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static userLogin(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

module.exports = Helper;
