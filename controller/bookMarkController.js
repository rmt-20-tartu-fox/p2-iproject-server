const { User, BookMark } = require("../models");

class BookMarkController {
  static async addBookMark(req, res, next) {
    try {
      const { id } = req.currentUser;
      const { hotel_id, room_id } = req.params;

      const bookmark = await BookMark.create({
        hotel_id,
        room_id,
        UserId: id,
      });

      res.status(200).json({ message: "Success add to bookmark." });
    } catch (err) {
      next(err);
    }
  }

  static async getBookMark(req, res, next) {
    try {
      const { id } = req.currentUser;

      const myBookMark = await BookMark.findAll({ where: { UserId: id }, attributes: {exclude: ['createdAt', 'updateAt']} });

      res.status(200).json(myBookMark);
    } catch (err) {
      next(err);
    }
  }

  static async cancelBookMark(req, res, next) {
    try {
      const { id } = req.currentUser;

      const myBookMark = await BookMark.findAll({ where: { UserId: id } });

      res.status(200).json(myBookMark);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BookMarkController;
