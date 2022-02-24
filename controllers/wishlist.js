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
              attributes: ["id"],
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
    try {
      const { id } = req.params;

      await Wishlist.destroy({
        where: {
          id
        }
      });

      res.status(200).json({ message: "You have remove this restaurant from your wishlist" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = WishlistController;
