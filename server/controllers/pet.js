const { Pet, Craving } = require("../models");
const { tokenConverter } = require("../helper/jwt");
const { Op } = require("sequelize");

class PetController {
  static async createPet(request, response, next) {
    try {
      const OwnerID = request.userData.id;
      console.log(request.body);
      const { name } = request.body;
      const hunger = 100;
      const craving = "Bone, meat, sausages";

      const data = Pet.create({
        name,
        hunger,
        craving,
        OwnerID,
      });

      response.status(201).json({ message: "Your pet has been born" });
    } catch (error) {
      next(error);
    }
  }
  static async checkPet(request, response, next) {
    try {
      // check OwnerID from localStorage
      console.log(request.userData, 66666666666666);

      const OwnerID = request.userData.id;

      const data = await Pet.findOne({
        where: {
          OwnerID,
        },
      });
      if (!data || data.length === 0) {
        response.status(200).json({ status: 0 });
      } else {
        response.status(200).json({ status: 1 });
      }
    } catch (error) {
      next(error);
    }
  }
  static async feedPet(request, response, next) {
    try {
      const labelsData = request.body.data.data
      const OwnerID = request.userData.id;
      const correctlyFedResponse = await Pet.increment(
        {
          hunger: 10,
        },
        {
          where: {
            OwnerID: OwnerID,
            [Op.or]: [
              { craving: { [Op.iLike]: `%${labelsData[0]}%` } },
              { craving: { [Op.iLike]: `%${labelsData[1]}%` } },
              { craving: { [Op.iLike]: `%${labelsData[2]}%` } },
            ],
          },
        }
      );
      if (!correctlyFedResponse) {
        response.status(200).json({ message: "Your pet doesn't like the food 😔" });
      } else {
        response.status(200).json({ message: "Your pet really like the food! 😍" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PetController;
