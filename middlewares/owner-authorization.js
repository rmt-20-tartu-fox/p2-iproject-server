const { Restaurant, User } = require("../models");

const ownerAuthorization = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (!id || !role) {
      throw { name: "FORBIDDEN_NOT_OWNER" };
    }

    if (role !== "Owner") {
      throw { name: "FORBIDDEN_NOT_OWNER" };
    }

    next()
  } catch (error) {
    next(error);
  }
};

module.exports = ownerAuthorization;
