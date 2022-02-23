const { User, Profile } = require("../models/index");

class Controller {
  static async readProfiles(req, res, next) {
    try {
      const UserId = req.currentUser.id;
      const user = await User.findOne({
        where: { id: UserId },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        include: [
          {
            model: Profile,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async createProfiles(req, res, next) {
    try {
      const UserId = req.currentUser.id;
      const baseUrl = "http://localhost:3000/";
      const photo = baseUrl + req.file.path.replace("\\", "/");
      const { name, education, job, description, sex, gender } = req.body;
      const newProfile = await Profile.create({
        name,
        photos: photo,
        education,
        job,
        description,
        sex,
        gender,
        UserId,
      });
      res.status(201).json(newProfile);
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
      res.status(201).json({ message: "profile has been updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
