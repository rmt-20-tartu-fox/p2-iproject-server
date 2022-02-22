const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const geoController = require("./geosControllers");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, dateOfBirth } = req.body;
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      const newUser = await User.create({
        email,
        password,
        dateOfBirth,
        age,
      });
      geoController.createGeo(newUser.id, next);
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("INVALID_EMAIL_OR_PASSWORD");
      }
      if (!comparePassword(password, user.password)) {
        throw new Error("INVALID_EMAIL_OR_PASSWORD");
      }
      const token = generateToken({
        id: user.id,
        email: user.email,
      });
      // postgeo
      geoController.updateGeo(user.id, next);
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
