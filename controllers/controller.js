const { User } = require('../models');
const { comparePassword } = require('../helper/bcrypt');
const { convertPayloadToToken } = require('../helper/jwt');
const { Op } = require('sequelize');

class Controller {
  
  static async loginUser(req, res, next) {
    const { email, password } = req.body
    if (!email) {
      throw new Error('BAD_REQUEST_EMAIL')
    } else if (!password) {
      throw new Error('BAD_REQUEST_PASSWORD')
    }
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });
      if (!user) {
        throw new Error('USER_INVALID')
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw new Error('USER_INVALID')
      }
      const payload = { id: user.id, email: user.email };
      const accessToken = convertPayloadToToken(payload);
      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      next(error)
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { name, email, password, gender } = req.body
      const response = await User.create({ name, email, password, gender })
      res.status(201).json({ email: response.email })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller