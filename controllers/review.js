const { Review, ReviewImage, User } = require("../models/");

class ReviewController {
  static async getAll(req, res, next) {
    try {
      const { restaurantId: RestaurantId } = req.params;

      const result = await Review.findAll({
        where: {
          RestaurantId
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [{
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: [{
            model: ReviewImage,
            attributes: {
              include: ["imgUrl"]
            }
          }]
        }]
      })

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    
  }
}

module.exports = ReviewController