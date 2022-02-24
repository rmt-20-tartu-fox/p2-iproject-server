const { User, BookMark } = require("../models");

class BookMarkController {
  static async addBookMark(req, res, next) {
    try {
      const { id } = req.currentUser;
      const { hotel_id, room_id, data } = req.body;

      console.log(req.body)

      const bookmark = await BookMark.create({
        hotel_id,
        room_id,
        UserId: id,
        data
      });

      res.status(200).json({ message: "Success add to bookmark." });
    } catch (err) {
      res.send(err);
      next(err);
    }
  }

  static async getBookMark(req, res, next) {
    try {
      const { id } = req.currentUser;

      const myBookMark = await BookMark.findAll({
        where: { UserId: id },
        attributes: { exclude: ["createdAt", "updateAt"] },
      });

      let hotel = [];
      myBookMark.forEach(el => {
        let tampung = []
        el.data.block.forEach(elm => {
          if (elm.room_id == el.room_id) {
            tampung.push(elm)
          }
        })

        for (const key in el.data.rooms) {
          if (key == el.room_id) {
            tampung.push(el.data.rooms[key])
          }
        }
        tampung.push(el.id)
        hotel.push(tampung)
      });

      myBookMark.data = hotel

      res.status(200).json(myBookMark.data);
    } catch (err) {
      next(err);
    }
  }

  static async cancelBookMark(req, res, next) {
    try {
      const { id } = req.params;
      const UserId = req.currentUser.id;

      const checkBookMark = await BookMark.findOne({ where: { id } });

      if (!checkBookMark) {
        throw {
          code: 404,
          name: "NotFound",
          message: "BookMark Not Found",
        };
      }

      const myBookMark = await BookMark.findOne({ where: { id, UserId } });

      if (!myBookMark) {
        throw {
          code: 403,
          name: "Forbiden",
          message: "You are not authorized",
        };
      }

      await BookMark.destroy({ where: { id, UserId } });

      res.status(200).json({message: "Success remove from bookmark."});
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BookMarkController;
