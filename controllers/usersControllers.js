const { default: axios } = require("axios");
const { Op } = require("sequelize");
const getDistanceFromLatLonInKm = require("../helpers/calculateDistance");
const { User, Profile, Geo } = require("../models/index");
const rapidApiKey = process.env.RAPID_API_KEY;

class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const { maxAge, sex, maxDistance, page } = req.query;
      const { id } = req.currentUser;
      // get geo from user
      const activeUser = await User.findOne({
        where: { id },
        attributes: {
          exclude: ["dateOfBirth", "password", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Geo,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Profile,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      const limit = 1;
      let paramQuery = {
        where: {
          [Op.and]: [],
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

      let allDistances = [];
      if (maxDistance) {
        // get Geo from all users
        const allGeos = await Geo.findAll({
          where: {
            id: { [Op.ne]: id },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
        // calculate
        allGeos.forEach((el) => {
          const calculation = getDistanceFromLatLonInKm(activeUser.Geo.latitude, activeUser.Geo.longitude, el.latitude, el.longitude);
          // filter by distances
          if (calculation < maxDistance) {
            allDistances.push(el.UserId);
          }
        });
        paramQuery.where[Op.and].push({ id: allDistances });
      }
      if (page && page - 1 > 0) {
        paramQuery.offset = (page - 1) * limit;
      }
      if (maxAge) {
        paramQuery.where[Op.and].push({
          age: { [Op.lte]: maxAge },
        });
      }
      if (sex && sex !== "both") {
        paramQuery.include[0].where = { sex };
      }
      let users = await User.findAndCountAll(paramQuery);
      const calculation = getDistanceFromLatLonInKm(activeUser.Geo.latitude, activeUser.Geo.longitude, users.rows[0].Geo.latitude, users.rows[0].Geo.longitude);
      const distances = {
        id: users.rows[0].id,
        distance: Math.ceil(calculation),
      };

      const options = {
        method: "GET",
        url: "https://love-calculator.p.rapidapi.com/getPercentage",
        params: { sname: users.rows[0].Profile.name, fname: activeUser.Profile.name },
        headers: {
          "x-rapidapi-host": "love-calculator.p.rapidapi.com",
          "x-rapidapi-key": rapidApiKey,
        },
      };
      const result = await axios.request(options);
      res.status(200).json({
        percent: +result.data.percentage,
        count: users.count,
        dist: distances,
        rows: users.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
