const { User, Like, Match } = require("../models/index");

class Controller {
  static async createMatch(id1, id2, next) {
    try {
      await Match.create({
        LikeId: id1,
        OtherLikeId: id2,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
