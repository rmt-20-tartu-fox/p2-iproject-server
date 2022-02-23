const { Wishlist } = require("../models");

const wishlistAuthorization = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findWishlist = await Wishlist.findByPk(id);

    if (!findWishlist) {
      throw { name: "NOT_FOUND" };
    }

    if (findWishlist.UserId !== req.user.id) {
      throw { name: "FORBIDDEN" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = wishlistAuthorization
