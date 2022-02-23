const axios = require("axios").default;
const api_id = "37739ed6";
const api_key = `
2d43044520cc6293d202b58fb76aa198`;

class RecipesController {
  static recipes = async (req, res, next) => {
    try {
      let { search, mealType } = req.query;
      console.log(req.query);
      if (!mealType) {
        axios
          .get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=37739ed6&app_key=%202d43044520cc6293d202b58fb76aa198%09`
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
            `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=37739ed6&app_key=%202d43044520cc6293d202b58fb76aa198%09&mealType=${mealType}`
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
      let { recipeId } = req.params;
      console.log(recipeId);
      axios
        .get(
          `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=37739ed6&app_key=2d43044520cc6293d202b58fb76aa198`
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
