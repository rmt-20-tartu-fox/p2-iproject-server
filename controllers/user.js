const { User } = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const ImageKit = require("imagekit");
const publicKey = process.env.IMAGEKIT_PUBLIC;
const privateKey = process.env.IMAGEKIT_PRIVATE;

let imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint: "https://ik.imagekit.io/iqpgx3omg7kg",
});

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;

      const response = await axios.get("https://picsum.photos/400");

      // console.log(imgUrl.request._redirectable._options.href)
      // console.log(imgUrl.data)

      const result = await User.create({
        username,
        email,
        password,
        imgUrl: response.request._redirectable._options.href,
        role,
      });

      res.status(201).json({
        id: result.id,
        username: result.username,
        email: result.email,
        role: result.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { user, password } = req.body;
      // console.log(password)

      if (!password) {
        throw { name: "INVALID_PASSWORD" };
      }
      if (!user) {
        throw { name: "INVALID_USER" };
      }

      const findUser = await User.findOne({
        where: {
          [Op.or]: [
            {
              username: user,
            },
            {
              email: user,
            },
          ],
        },
      });

      if (!findUser) {
        throw { name: "INVALID_USER" };
      }

      if (!comparePassword(password, findUser.password)) {
        throw { name: "INVALID_USER" };
      }

      const payload = {
        id: findUser.id,
      };

      const token = signToken(payload);

      res.status(200).json({
        access_token: token,
        username: findUser.username,
        email: findUser.email,
        role: findUser.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const response = await axios.get("https://picsum.photos/400");

      const [user] = await User.findOrCreate({
        where: {
          usename: payload.email,
          email: payload.email,
        },
        defaults: {
          imgUrl: response.request._redirectable._options.href,
          password: "12345678",
          role: "Customer",
        },
      });

      const accessToken = createToken({
        id: user.id,
      });
      res.status(200).json({
        access_token: accessToken,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { username, email, password, passwordBefore } = req.body;

      const findUser = await User.findByPk(req.user.id);

      if (!findUser) {
        throw { name: "USER_NOT_FOUND" };
      }

      if (!comparePassword(passwordBefore, findUser.password)) {
        throw { name: "PASSWORD_NOT_MATCH" };
      }

      await User.update(
        {
          username,
          email,
          password,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      const image = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalName,
        useUniqueFileName: true,
        folder: "/profile",
      });

      const updateImage = await User.update(
        {
          imgUrl: image.url,
        },
        {
          where: {
            id: req.user.id,
          },
          returning: true,
        }
      );

      res.status(200).json(updateImage[1]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
