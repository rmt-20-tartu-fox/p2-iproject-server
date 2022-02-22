const axios = require("axios");
const { Meme } = require("../models");
const { upload } = require("../middlewares/multer");

class MemeController {
  static getMemesAPI = async (req, res, next) => {
    try {
      await axios
        .get("http://api-1cak.herokuapp.com/random", {})
        .then((resp) => {
          res.status(200).json(resp.data);
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
      let memes = await Meme.findAll();

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
          next(err);
        } else {
          if (!req.file) {
            throw {
              name: "notFound",
              message: "You have not select image file",
            };
          }

          const { id } = req.loggedUser;

          const { title, nsfw, CategoryId } = req.body;
          const image = req.file.path;

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
