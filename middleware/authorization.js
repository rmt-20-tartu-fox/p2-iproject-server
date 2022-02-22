const { User } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.currentUser;
    const user = await User.findByPk(id);

    if (!user) {
      throw {
        code: 403,
        name: "Forbiden",
        message: "You are not authorized",
      };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
