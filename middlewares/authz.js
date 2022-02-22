const { User } = require("../models");

const authorization = async (req, res, next) => {
  try {
    let { id } = req.params;
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
