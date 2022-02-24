const { Op } = require("sequelize");
const getDistanceFromLatLonInKm = require("../helpers/calculateDistance");
const { User, Profile, Geo } = require("../models/index");

class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const { maxAge, sex, maxDistance, page } = req.query;
      const { id } = req.currentUser;
      // get geo here
      const geo = await Geo.findOne({
        where: {
          UserId: id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      const limit = 1;
      let paramQuery = {
        where: {
          [Op.and]: [{ id: { [Op.ne]: id } }],
        },
        attributes: {
          exclude: ["dateOfBirth", "password", "createdAt", "updatedAt"],
        },
        limit: limit,
        include: [
          {
            model: Profile,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Geo,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      };
      if (maxAge) {
        paramQuery.where[Op.and].push({
          age: { [Op.lte]: maxAge },
        });
      }
      if (page && page - 1 > 0) {
        paramQuery.offset = (page - 1) * limit;
      }
      if (sex && sex !== "both") {
        paramQuery.include[0].where = { sex };
      }
      let users = await User.findAndCountAll(paramQuery);
      let distances = [];
      users.rows.forEach((el) => {
        const calculation = getDistanceFromLatLonInKm(geo.latitude, geo.longitude, el.Geo.latitude, el.Geo.longitude);
        distances.push({
          id: el.id,
          distance: Math.ceil(calculation),
        });
      });

      if (maxDistance) {
        users.rows.filter((el) => {
          el.distance <= maxDistance;
        });
        distances.filter((el) => {
          el <= maxDistance;
        });
      }

      res.status(200).json({
        count: users.count,
        dist: distances,
        rows: users.rows,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
