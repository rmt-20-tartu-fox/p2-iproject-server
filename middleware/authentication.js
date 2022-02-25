const JWT = require("../helper/jwt");
const { User } = require("../models");

const loginMiddleware = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const payload = JWT.convertToken(access_token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw {
        code: 401,
        name: "Unauthorize",
        message: "Invalid Token or User.",
      };
    }

    req.currentUser = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = loginMiddleware;
