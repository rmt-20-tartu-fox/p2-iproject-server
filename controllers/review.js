const { Review, ReviewImage, User } = require("../models/");
const ImageKit = require("imagekit");
const publicKey = process.env.IMAGEKIT_PUBLIC;
const privateKey = process.env.IMAGEKIT_PRIVATE;

let imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint: "https://ik.imagekit.io/iqpgx3omg7kg",
});

class ReviewController {
  static async getAll(req, res, next) {
    try {
      const { restaurantId: RestaurantId } = req.params;

      const result = await Review.findAll({
        where: {
          RestaurantId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: ReviewImage,
                attributes: {
                  include: ["imgUrl"],
                },
              },
            ],
          },
        ],
      });

      if (!result) {
        throw { name: 'NOT_FOUND' }
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Review.destroy(id);

      res.status(200).json({ message: "This review has been deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { restaurantId: RestaurantId } = req.params;
      const { review, rating } = req.body;
      const { id: UserId } = req.user;

      // console.log(req.files.length)

      const result = await Review.create({
        review,
        rating,
        UserId,
        RestaurantId,
      });
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          let image = await imagekit.upload({
            file: req.files[i].buffer,
            fileName: req.files[i].originalname,
            useUniqueFileName: true,
            folder: "/review",
          });

          await ReviewImage.create({
            ReviewId: result.id,
            RestaurantId,
            UserId,
            imgUrl: image.url,
          });
        }
      }

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReviewController;
