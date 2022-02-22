const getDistanceFromLatLonInKm = require("../helpers/calculateDistance");
const { User, Profile, Geo } = require("../models/index");

class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const { age, sex, maxDistance } = req.query;
      const { id } = req.currentUser;
      // get geo here
      const geo = await Geo.findOne({
        where: {
          UserId: id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      let paramQuery = {
        attributes: {
          exclude: ["dateOfBirth", "password", "createdAt", "updatedAt"],
        },
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
      if (age) {
        paramQuery.where = { age };
      }
      if (sex && sex !== "both") {
        paramQuery.include[0].where = { sex };
      }
      let users = await User.findAll(paramQuery);
      let distances = [];
      users.forEach((el) => {
        const calculation = getDistanceFromLatLonInKm(geo.latitude, geo.longitude, el.Geo.latitude, el.Geo.longitude);
        distances.push({
          id: el.id,
          distance: Math.ceil(calculation),
        });
      });

      if (maxDistance) {
        users.filter((el) => {
          el.distance <= maxDistance;
        });
      }
      res.status(200).json({
        dist: distances,
        rows: users,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
