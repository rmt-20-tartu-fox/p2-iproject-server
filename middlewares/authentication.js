const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token: token } = req.headers;

    if (!token) {
      throw { name: "AUTHENTICATION_FAILED" };
    }

    const { id } = verifyToken(token);
    const findUser = await User.findByPk(id);

    if (!findUser) {
      throw { name: "AUTHENTICATION_FAILED" };
    }

    req.user = {
      id,
      username: findUser.username,
      email: findUser.email,
      role: findUser.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
