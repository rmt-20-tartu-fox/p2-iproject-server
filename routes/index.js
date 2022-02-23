const express = require("express");
const router = express.Router();
const RecipesController = require("../Controller/recipesController");
const UserController = require("../Controller/userController");
const authentication = require("../midlewares/authentication");
const UserRecipeWishList = require("../Controller/wishlistController");
const authorization = require("../midlewares/authorization");
const BmiController = require("../Controller/BMIcontroller");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/recipes", RecipesController.recipes);
router.get("/recipes/:recipeId", RecipesController.recipeDetail);
router.get("/bmi", BmiController.bmi);
router.use(authentication);
router.get("/wishlist", UserRecipeWishList.getWishlist);
router.post("/wishlist/:RecipeId", UserRecipeWishList.createWishList);
router.delete(
  "/wishlist/:id",
  authorization,
  UserRecipeWishList.deleteWishList
);
module.exports = router;
