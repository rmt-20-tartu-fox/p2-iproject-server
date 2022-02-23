const axios = require("axios").default;
class BmiController {
  static bmi = async (req, res, next) => {
    try {
      const { weight, height } = req.query;
      console.log(req.query);
      const options = await axios({
        method: "GET",
        url: "https://body-mass-index-bmi-calculator.p.rapidapi.com/metric",
        params: { weight: `${weight}`, height: `${height}` },
        headers: {
          "x-rapidapi-host": "body-mass-index-bmi-calculator.p.rapidapi.com",
          "x-rapidapi-key":
            "7f8ee39318msh065872cc27ce770p1f1b00jsne1ba0d881ce3",
        },
      });
      // console.log(options.data.bmi);
      res.status(200).json(options.data.bmi);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = BmiController;
