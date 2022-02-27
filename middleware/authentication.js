const { tokenConverter } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (request, response, next) => {
  try {
    const { access_token } = request.headers;
    if (!access_token) {
      throw {
        code: 401,
        name: "No token provided",
        message: "No token provided",
      };
    }
    const payload = tokenConverter(access_token);
    const userData = await User.findByPk(payload.id);
    if (!userData) {
      throw {
        code: 401,
        name: "Invalid User",
        message: "Invalid user or token",
      };
    }
    request.userData = {
      id: userData.id,
      email: userData.email,
    };
    console.log(`masuk1`);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
