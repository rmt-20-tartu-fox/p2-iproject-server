const { User, BookMark } = require("../models");
const axios = require("axios").default;
const Helper = require("../helper/helper");
const JWT = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID;

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({
        name,
        email,
        password
      });

      res.status(200).json({ id: user.id, name: user.name, email: user.email });
    } catch (err) {
      next(err);
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw {
          code: 401,
          name: "Unauthorize",
          message: "Invalid Input Email or Password",
        };
      }

      const validUser = Helper.userLogin(password, user.password);

      if (!validUser) {
        throw {
          code: 401,
          name: "Unauthorize",
          message: "Invalid Input Email or Password",
        };
      }

      const payload = { id: user.id, email: user.email, role: user.role };
      const access_token = JWT.convertPayload(payload);

      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client(CLIENT_ID);
      const { google_token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        default: {
          name: payload.name,
          role: "costumer",
        },
      });

      const googleJWTPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const access_token = JWT.convertPayload(googleJWTPayload);

      res.status(200).json({
        id: user.id,
        email: user.email,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
