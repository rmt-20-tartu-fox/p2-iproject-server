const { Restaurant, Review } = require("../models");
const { Sequelize } = require("sequelize");

const ImageKit = require("imagekit");
const publicKey = process.env.IMAGEKIT_PUBLIC;
const privateKey = process.env.IMAGEKIT_PRIVATE;

let imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint: "https://ik.imagekit.io/iqpgx3omg7kg",
});

class RestaurantController {
  static async add(req, res, next) {
    let image;
    try {
      const { name, address, lat, lng, mapsUrl, description } = req.body;
      const { id: UserId } = req.user;

      const result = await Restaurant.create({
        UserId: req.user.id,
        name,
        address,
        lat,
        lng,
        mapsUrl,
        description,
      });

      image = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        useUniqueFileName: true,
        folder: "/restaurant",
      });

      const updateImage = await Restaurant.update(
        {
          imgUrl: image.url,
        },
        {
          where: {
            id: result.id,
          },
          returning: true,
        }
      );

      res.status(200).json(updateImage[1]);
    } catch (error) {
      // await imagekit.deleteFile(image.fileId);
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await Restaurant.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
          include: [
            [Sequelize.fn("AVG", Sequelize.col("Reviews.rating")), "avgRating"],
            [Sequelize.fn("COUNT", Sequelize.col("Reviews.review")), "reviewCount"],
          ],
        },
        include: [
          {
            model: Review,
            attributes: [],
          },
        ],
        raw: true,
        group: ["Restaurant.id"],
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RestaurantController;
