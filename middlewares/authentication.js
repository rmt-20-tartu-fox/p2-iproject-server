const { User } = require("../models");
const { convToPayload } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token: token } = req.headers;
    let payload = convToPayload(token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw {
        code: 401,
        name: "Invalid_token",
        message: "Invalid token",
      };
    }

    req.dataOnLogin = {
      id: user.id,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
