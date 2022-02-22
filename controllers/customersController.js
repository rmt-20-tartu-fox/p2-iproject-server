const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const registerCustomer = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.create({ email, password });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    next(error);
  }
};

const loginCustomer = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("NOT_FOUND");
    }
    let isValid = comparePassword(password, user.password);
    if (!isValid) {
      throw new Error("NOT_FOUND");
    }
    let token = signToken({ id: user.id, email: user.email });
    res.status(200).json({ access_token: token });
  } catch (error) {
    next(error);
  }
};

const getCarts = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
};
