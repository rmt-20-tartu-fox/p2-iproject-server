const getDistanceFromLatLonInKm = require("../helpers/calculateDistance");
const { User, Profile, Geo } = require("../models/index");
const { cloudinary } = require("../config/cloudinary");

class Controller {
  static async readProfiles(req, res, next) {
    try {
      const UserId = req.params.id;
      const { id } = req.currentUser;
      // get geo here
      const geo = await Geo.findOne({
        where: {
          UserId: id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      const user = await User.findOne({
        where: { id: UserId },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
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
      });
      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }
      const calculation = getDistanceFromLatLonInKm(geo.latitude, geo.longitude, user.Geo.latitude, user.Geo.longitude);
      res.status(200).json({ distance: Math.ceil(calculation), user });
    } catch (error) {
      next(error);
    }
  }

  static async createProfiles(req, res, next) {
    try {
      const UserId = req.currentUser.id;
      cloudinary.uploader.upload(req.file.path, async function (error, result) {
        const photoUrl = result.url;
        console.log(photoUrl);
        const { name, education, job, description, sex, gender } = req.body;
        const newProfile = await Profile.create({
          name,
          photos: photoUrl,
          education,
          job,
          description,
          sex,
          gender,
          UserId,
        });
        res.status(201).json(newProfile);
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfiles(req, res, next) {
    try {
      const UserId = req.currentUser.id;
      const { name, photos, education, job, description, sex, gender } = req.body;
      const profile = await Profile.update(
        {
          name,
          photos,
          education,
          job,
          description,
          sex,
          gender,
        },
        { where: { UserId } }
      );
      res.status(201).json({ message: `user profile with UserId ${profile.UserId} has been updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
