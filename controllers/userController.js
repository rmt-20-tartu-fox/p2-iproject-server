const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.create({ email, password });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email or password must be inputted" });
    } else {
      let foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        res.status(401).json({ message: "Invalid email/password" });
      } else {
        let isPass = compare(password, foundUser.password);
        if (isPass) {
          let payload = {
            id: foundUser.id,
            email: foundUser.email,
          };

          let token = signToken(payload);
          res.status(200).json({ user: foundUser.email, access_token: token });
        } else {
          res.status(401).json({ message: "Invalid email/password" });
        }
      }
    }
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = {
  register,
  login,
};
