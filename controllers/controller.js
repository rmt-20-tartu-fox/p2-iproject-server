const { User, History, Balance } = require("../models")
const { signToken, tokenToPayload, comparePassword } = require('../helper/helper')
const { Op } = require("sequelize");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, name } = req.body
      if (!email) {
        res.status(400).json({ message: "Email is required" })
      } else if (!password) {
        res.status(400).json({ message: "Password is required" })
      } else {
        const result = await User.create({ email, password, name })
        res.status(201).json({
          id: result.id,
          email: result.email,
          name: result.name,
        })
      }
    }
    catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: "Email must be unique" })
      } else if (err.errors[0].message === "Invalid email format") {
        res.status(400).json({ message: "Invalid email format" })
      } else {
        res.status(500).json({ message: "Internal server error" })
      }
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email) {
        res.status(400).json({ message: "Email is required" })
      } else if (!password) {
        res.status(400).json({ message: "Password is required" })
      } else {
        const user = await User.findOne({ where: { email } })
        if (user) {
          if (comparePassword(password, user.password)) {
            const payload = {
              id: user.id,
              email: user.email,
              name: user.name
            }
            const accessToken = signToken(payload)
            res.status(200).json({ access_token: accessToken })
          } else {
            res.status(401).json({ message: "Invalid email/password" })
          }
        } else {
          res.status(401).json({ message: "Invalid email/password" })
        }
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" })
    }
  }
  static async postBalance(req, res, next) {
    try {
      const { title, type } = req.body
      const UserId = req.loginUser.id
      if (!title) {
        throw ({ code: 400, message: 'title is required' })
      }
      if (!type) {
        throw ({ code: 400, message: 'type is required' })
      }
      const result = await Balance.create({ title, type, UserId })
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
  static async getBalance(req, res, next) {
    try {
      const UserId = req.loginUser.id
      const result = await Balance.findAll({ where: { UserId } })
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller