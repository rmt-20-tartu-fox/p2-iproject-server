const { comparePass } = require("../helpers/bcrypt");
const { payloadToToken } = require("../helpers/jwt");
const { User } = require("../models");
// import axios from "axios";

class Controller {
  static register = async (req, res, next) => {
    try {
      const { username, email, password, yearOfBirth } = req.body;

      let result = await User.create({
        username,
        email,
        password,
        yearOfBirth,
      });

      res.status(201).json({
        id: result.id,
        username: result.username,
        email: result.email,
        yearOfBirth: result.yearOfBirth,
      });
    } catch (err) {
      next(err);
    }
  };
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw {
          code: 401,
          name: "Unauthorized",
          message: "Invalid email/password",
        };
      }

      const isValidPass = comparePass(password, user.password);

      if (!isValidPass) {
        throw {
          code: 401,
          name: "Unauthorized",
          message: "Invalid email/password",
        };
      }

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      const access_token = payloadToToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = {
  Controller,
};
