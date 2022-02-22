const { User } = require("../models");
const user = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    let payload = verifyToken(access_token);
    let user = await User.findOne({});
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
