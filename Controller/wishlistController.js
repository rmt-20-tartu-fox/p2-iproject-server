const { User, UserRecipe } = require("../models");
const axios = require("axios");

class UserRecipeWishList {
  static createWishList = async (req, res, next) => {
    try {
      const APP_ID = process.env.APP_ID;
      const APP_KEY = process.env.APP_KEY;

      const UserId = req.loginUser.id;
      // console.log(UserId, "<><><><>");
      const { RecipeId } = req.params;
      // console.log(req.params, "<><><><><><><>");

      const checkWishList = await UserRecipe.findOne({
        where: {
          UserId,
          RecipeId: RecipeId,
        },
      });

      if (checkWishList) {
        throw {
          name: "CustomError",
          status: 400,
        };
      }

      const recipeResult = await axios.get(
        `https://api.edamam.com/api/recipes/v2/${RecipeId}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&field=uri&field=label&field=image&field=ingredientLines&field=calories`
      );
      // console.log(recipeResult.data);
      const createWishList = await UserRecipe.create({
        UserId,
        RecipeId: RecipeId,
        recipe: recipeResult.data,
      });
      res.status(201).json({ message: "created" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static getWishlist = async (req, res, next) => {
    try {
      const UserId = req.loginUser.id;
      // console.log(UserId, "><><><><><><><>");

      const getWishList = await UserRecipe.findAll({
        where: { UserId },
      });

      res.status(200).json(getWishList);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static deleteWishList = async (req, res, next) => {
    try {
      const UserId = req.loginUser.id;
      // console.log(UserId, "<><><><>");
      const { id } = req.params;
      // console.log(req.params, "<><><><><><><>");

      const deleteWishList = await UserRecipe.destroy({
        where: { id },
      });

      if (deleteWishList) {
        res.status(200).json({
          message: "Successfully delete your wishlist",
        });
      } else {
        throw {
          code: 404,
          name: "notFound",
          message: "Wishlist not Found",
        };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
module.exports = UserRecipeWishList;
