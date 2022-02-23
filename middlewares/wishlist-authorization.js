const { Wishlist } = require("../models");

const wishlistAuthorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id)

    const findWishlist = await Wishlist.findOne({
      where: {
        id
      }
    })

    if (!findWishlist) {
      throw { name: "NOT_FOUND" };
    }

    if (findWishlist.UserId !== req.user.id) {
      throw { name: "FORBIDDEN" };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = wishlistAuthorization;
