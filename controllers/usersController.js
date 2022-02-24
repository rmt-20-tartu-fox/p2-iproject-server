const { User } = require('../models');
const { verifyToken, signToken } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

class usersController {
  static register = async (req, res, next) => {
    try {
      const { email, name, password } = req.body;
      const user = await User.create({ email, name, password });
      res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (err) {
      next(err);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const payload = { id: user.id, name: user.name, email: user.email };
          res.status(200).json({ access_token: signToken(payload) });
        } else {
          throw {
            name: 'authentication_fail',
            code: 401,
            message: 'Invalid email/password'
          };
        }
      } else {
        throw {
          name: 'authentication_fail',
          code: 401,
          message: 'Invalid email/password'
        };
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = usersController;