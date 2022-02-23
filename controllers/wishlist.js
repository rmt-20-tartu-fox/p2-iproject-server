const { User, Restaurant, Wishlist, Review } = require("../models");

class WishlistController {
  static async getAll(req, res, next) {
    try {
      const { id } = req.user;

      const result = await User.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
        include: [
          {
            model: Restaurant,
            through: {
              model: Wishlist,
              attributes: [],
            },
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "Review",
                "Rating",
                "ratingCount",
              ],
            },
          },
        ],
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { restaurantId: RestaurantId } = req.params;

      const findResto = await Restaurant.findByPk(RestaurantId);

      if (!findResto) {
        throw { name: "NOT_FOUND" };
      }

      const result = await Wishlist.create({
        UserId: req.user.id,
        RestaurantId,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    // const {  }
  }
}

module.exports = WishlistController;
