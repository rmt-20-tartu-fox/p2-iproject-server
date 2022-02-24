const { Review } = require("../models");

const reviewAuthorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: UserId } = req.user;

    const result = await Review.findByPk(id);

    if (!result) {
      throw { name: "NOT_FOUND" };
    }

    if (result.UserId !== UserId) {
      throw { name: "FORBIDDEN" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = reviewAuthorization;
