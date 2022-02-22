const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
const user = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    let payload = verifyToken(access_token);
    let user = await User.findByPK(payload.id);
    if (!user) {
      throw new Error("INVALID_TOKEN");
    }
    req.userLogin = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentication;
