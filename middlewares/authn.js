const { tokenToPayload } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw {
        name: "JsonWebTokenError",
      };
    }

    const payload = tokenToPayload(access_token);

    let user = await User.findByPk(payload.id);

    if (!user) {
      throw {
        name: "JsonWebTokenError",
      };
    }

    req.loggedUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  authentication,
};
