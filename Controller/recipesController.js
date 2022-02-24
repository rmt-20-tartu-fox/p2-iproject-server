const axios = require("axios").default;

class RecipesController {
  static recipes = async (req, res, next) => {
    try {
      const APP_ID = process.env.APP_ID;
      const APP_KEY = process.env.APP_KEY;

      let { search, mealType } = req.query;
      console.log(req.query);
      if (!mealType) {
        axios
          .get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${APP_ID}&app_key=%20${APP_KEY}%09`
          )
          .then((resp) => {
            // console.log(resp.data);
            res.status(200).json(resp.data.hits);
          })
          .catch((err) => {
            next(err);
          });
      } else {
        axios
          .get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${APP_ID}&app_key=%20${APP_KEY}%09&mealType=${mealType}`
          )
          .then((resp) => {
            res.status(200).json(resp.data.hits);
          })
          .catch((err) => {
            next(err);
          });
      }
    } catch (err) {
      next(err);
    }
  };

  static recipeDetail = async (req, res, next) => {
    try {
      const APP_ID = process.env.APP_ID;
      const APP_KEY = process.env.APP_KEY;
      let { recipeId } = req.params;
      // console.log(recipeId);
      axios
        .get(
          `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
        )
        .then((resp) => {
          res.status(200).json(resp.data);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = RecipesController;
