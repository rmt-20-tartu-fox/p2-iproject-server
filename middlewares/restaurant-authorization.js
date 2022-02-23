const { Restaurant, User } = require("../models");

const restaurantAuthorization = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { id: restaurantId } = req.params;

    const result = await Restaurant.findByPk(restaurantId);

    if (id !== result.UserId) {
      throw { name: "FORBIDDEN" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = restaurantAuthorization;
