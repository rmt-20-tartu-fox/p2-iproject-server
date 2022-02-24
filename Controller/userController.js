const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");
const { sendEmail } = require("../helpers/send_email");
// const { OAuth2Client } = require("google-auth-library");

class UserController {
  static register = async (req, res, next) => {
    try {
      // console.log(req.body);
      const { email, password } = req.body;
      // console.log(req.body);
      const userRegister = await User.create({
        email,
        password,
      });

      sendEmail(userRegister.email);

      res.status(201).json({
        email: userRegister.email,
      });
    } catch (err) {
      console.log(err);
      next(err); // move to error handler
    }
  };

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      const user = await User.findOne({
        where: {
          email,
        },
      });
      // console.log(user);
      if (user) {
        const isValidPassword = comparePassword(password, user.password);
        if (isValidPassword) {
          const payload = {
            id: user.id,
            email: user.email,
          };
          res.status(200).json({
            message: "Login Successfull",
            access_token: generateToken(payload),
            id: user.id,
            email: user.email,
          });
        } else {
          throw {
            code: 401,
            name: "unauthorized",
            message: "Invalid Email or Password",
          };
        }
      } else {
        throw {
          code: 401,
          name: "unauthorized",
          message: "Invalid Email or Password",
        };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = UserController;
