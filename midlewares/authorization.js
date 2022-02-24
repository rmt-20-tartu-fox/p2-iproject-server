const { UserRecipe } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const UserId = req.loginUser.id;
    console.log(UserId);
    const { id } = req.params;

    const data = await UserRecipe.findOne({
      where: { id },
    });
    console.log(data);

    if (!data) {
      throw {
        code: 404,
        name: "notFound",
        message: "Course not found",
      };
    }

    if (data.UserId !== UserId) {
      throw {
        name: "ReferenceError",
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
