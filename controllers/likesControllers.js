const { User, Like } = require("../models/index");
const matchController = require("../controllers/matchesControllers");

class Controller {
  static async createLikes(req, res, next) {
    try {
      const { status } = req.query;
      const OtherUserId = req.params.id;
      const { id } = req.currentUser;
      const like = await Like.create({
        UserId: id,
        OtherUserId,
        status,
      });
      res.status(201).json(like);
      const otherLike = await Like.findOne({
        where: {
          UserId: OtherUserId,
          OtherUserId: id,
        },
      });
      if (otherLike && otherLike.status === "like" && like.status === "like") {
        matchController.createMatch(like.id, otherLike.id, next);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
