// const { Restaurant, User } = require("../models");

const customerAuthorization = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (!id || !role) {
      throw { name: "FORBIDDEN_NOT_OWNER" };
    }

    if (role !== "Customer") {
      throw { name: "FORBIDDEN_NOT_CUSTOMER" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = customerAuthorization;
