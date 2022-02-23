const { Restaurant, User } = require("../models");

const ownerAuthorization = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (!id || !role) {
      throw { name: "FORBIDDEN" };
    }

    if (role !== "Owner") {
      throw { name: "FORBIDDEN" };
    }

    next()
  } catch (error) {
    next(error);
  }
};

module.exports = ownerAuthorization;
