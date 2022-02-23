const { Op } = require("sequelize");
const { Match } = require("../models/index");

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

  static async viewMatches(req, res, next) {
    try {
      const { id } = req.currentUser;
      const matches = await Match.findAll({
        where: {
          [Op.or]: [{ LikeId: id }, { OtherLikeId: id }],
        },
      });
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
