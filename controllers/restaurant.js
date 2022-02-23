const { Restaurant } = require("../models");

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
        description
      });

      image = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        useUniqueFileName: true,
        folder: "/restaurant",
      });

      const updateImage = await Restaurant.update({
        imgUrl: image.url
      }, {
        where: {
          id: result.id,
        },
        returning: true
      })

      res.status(200).json(updateImage[1]);
    } catch (error) {
      // await imagekit.deleteFile(image.fileId);
      next(error);
    }
  }
}

module.exports = RestaurantController;
