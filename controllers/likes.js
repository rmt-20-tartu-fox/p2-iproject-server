const { Meme, Like, User } = require("../models");

class LikeController {
  static getLikes = async (req, res, next) => {
    try {
      const { id } = req.loggedUser;
      let likes = await Like.findAll({
        where: {
          UserId: id,
        },
        include: {
          model: Meme,
        },
      });

      res.status(200).json(likes);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static postLike = async (req, res, next) => {
    try {
      const { memeId } = req.params;
      const { id } = req.loggedUser;

      await Like.create({
        UserId: id,
        MemeId: memeId,
      });

      res.status(201).json({ message: "Meme has been liked" });
    } catch (err) {
      next(err);
    }
  };

  static deleteLike = async (req, res, next) => {
    try {
      const { id } = req.params;

      await Like.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "Unliked" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  LikeController,
};
