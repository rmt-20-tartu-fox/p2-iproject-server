const { User, History, Balance } = require("../models")
const { signToken, tokenToPayload, comparePassword } = require('../helper/helper')
const { Op, DATE } = require("sequelize");
const axios = require("axios")

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
      } else if (err?.errors[0]?.message === "Invalid email format") {
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
      console.log(123);
      const { title, type, crypto } = req.body
      console.log(req.body);
      const UserId = req.loginUser.id
      if (!title) {
        throw ({ code: 400, message: 'title is required' })
      }
      if (!type) {
        throw ({ code: 400, message: 'type is required' })
      }
      if (crypto === undefined) {
        throw ({ code: 400, message: 'crypto is required' })
      }
      const result = await Balance.create({ title, type, UserId, crypto })
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
  static async getBalance(req, res, next) {
    try {
      const UserId = req.loginUser.id
      const result = await Balance.findAll({
        where: { UserId },
        include: History,
      })
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async postHistory(req, res, next) {
    try {
      const { BalanceId, value, valueCrypto } = req.body
      const UserId = req.loginUser.id
      let image = ''

      if (req.file) {
        image = req.file.path
        image = image.replace('/upload', '/upload/w_300')
      }

      const balance = await Balance.findByPk(BalanceId)
      if (!balance) {
        throw ({ code: 404, message: 'Balance not found' })
      }
      if (balance.UserId !== UserId) {
        throw ({ code: 403, message: 'Not Authorized' })
      }

      const result = await History.create({ BalanceId, value, UserId, valueCrypto, attachment: image })

      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async getHistory(req, res, next) {
    try {
      const UserId = req.loginUser.id
      const result = await History.findAll({
        where: { UserId },
        include: Balance,
        order: ["createdAt"]
      })
      const newArr = result.map(el => {
        return el.value
      })
      const total = newArr.reduce(
        (previousValue, currentValue) => Number(previousValue) + Number(currentValue)
      );
      console.log(result);
      res.status(201).json({ result, total })
    } catch (err) {
      next(err)
    }
  }
  static async getCrypto(req, res, next) {
    try {
      const result = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY_NOMICS}&ids=BTC,ETC&convert=IDR`)
      console.log(result.data);
      res.status(200).json({ BTC: result.data[0].price, ETH: result.data[1].price })
    } catch (err) {
      next(err)
    }
  }


  static async getForex(req, res, next) {
    try {
      const { forex } = req.body
      const result = await axios.get(`https://api.nomics.com/v1/exchange-rates?key=${process.env.API_KEY_NOMICS}`)
      let idr = result.data.find(o => o.currency === 'IDR');
      let eur = result.data.find(o => o.currency === 'EUR');
      let rate = 1 / idr.rate
      let rate2 = eur.rate / idr.rate
      res.status(200).json({ USD: rate, EUR: rate2 })
    } catch (err) {
      next(err)
    }
  }

  static async getHistoryByBalance(req, res, next) {
    try {
      const UserId = req.loginUser.id
      const { BalanceId } = req.params
      const balance = await Balance.findByPk(BalanceId)
      if (!balance) {
        throw ({ code: 404, message: 'Balance not found' })
      }
      if (balance.UserId !== UserId) {
        throw ({ code: 403, message: 'Not Authorized' })
      }

      const result = await History.findAll({
        where: { UserId, BalanceId }
      })
      const newArr = result.map(el => {
        return el.value
      })
      const total = newArr.reduce(
        (previousValue, currentValue) => Number(previousValue) + Number(currentValue)
      );
      res.status(201).json({ result, total })
    } catch (err) {
      next(err)
    }
  }

  static async updateHistory(req, res, next) {
    try {
      const { id } = req.params
      const { BalanceId, value, attachment, createdAt } = req.body
      const UserId = req.loginUser.id
      const balance = await Balance.findByPk(BalanceId)
      const history = await History.findByPk(id)
      if (!history) {
        throw ({ code: 404, message: 'History not found' })
      }
      if (!balance) {
        throw ({ code: 404, message: 'Balance not found' })
      }
      if (balance.UserId !== UserId || history.UserId !== UserId) {
        throw ({ code: 403, message: 'Not Authorized' })
      }
      const result = History.update({
        BalanceId, value, attachment, createdAt
      }, {
        where: { id }
      })
      res.status(200).json({ message: "History has beed updated" })

    } catch (err) {
      next(err)
    }
  }

}

module.exports = Controller