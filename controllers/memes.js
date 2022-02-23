const axios = require("axios");
const { Meme } = require("../models");
const { upload } = require("../middlewares/multer");

class MemeController {
  static getMemesAPI = async (req, res, next) => {
    try {
      axios
        .get("https://meme-api.herokuapp.com/gimme/6", {})
        .then((resp) => {
          console.log(resp);
          res.status(200).json(resp.data.memes);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static getMemes = async (req, res, next) => {
    try {
      const { CategoryId } = req.query;

      let where = {};

      CategoryId ? (where.CategoryId = CategoryId) : {};

      let memes = await Meme.findAll({
        where: where,
      });

      res.status(200).json(memes);
    } catch (err) {
      next(err);
    }
  };

  static getMyMemes = async (req, res, next) => {
    try {
      const { id } = req.loggedUser;

      let memes = await Meme.findAll({
        where: {
          UserId: id,
        },
      });

      res.status(200).json(memes);
    } catch (err) {
      next(err);
    }
  };

  static postMemes = async (req, res, next) => {
    try {
      await upload(req, res, async (err) => {
        if (err) {
          console.log("masuk error upload <<<<<<<<< ");
          next(err);
        } else {
          console.log(req.body, "<<<<<<<< req");

          if (!req.file) {
            throw {
              name: "notFound",
              message: "You have not select image file",
            };
          }

          const { id } = req.loggedUser;

          const { title, nsfw, CategoryId } = req.body;
          let path = req.file.path;

          let image = path.slice(7);

          const meme = await Meme.create({
            title,
            image,
            nsfw,
            UserId: id,
            CategoryId,
          });

          res.status(200).json(meme);
        }
      });
    } catch (err) {
      console.log(err, "<<<<<<<<<< err");
      next(err);
    }
  };
}

module.exports = {
  MemeController,
};
