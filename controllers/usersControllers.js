const getDistanceFromLatLonInKm = require("../helpers/calculateDistance");
const { User, Profile, Geo } = require("../models/index");

class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const { age, sex, distance } = req.query;
      const { id } = req.currentUser;
      // get geo here
      const geo = await User.findByOne({
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
      // calculate distance
      users.forEach((el) => {
        el.distance = getDistanceFromLatLonInKm(geo.longitude, geo.latitude, el.Geo.latitude, el.Geo.longitude);
      });
      users.filter((el) => {
        el.distance > distance;
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async getOneUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
