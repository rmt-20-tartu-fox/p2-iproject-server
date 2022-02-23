const { Like } = require("../models");

const likeAuthz = async (req, res, next) => {
  try {
    const UserId = req.loggedUser.id;
    const { id } = req.params;

    let like = await Like.findOne({
      where: {
        id,
      },
    });

    if (!like) {
      throw {
        name: "notFound",
        message: "Course not found",
      };
    }

    if (like.UserId != UserId) {
      throw {
        name: "Unauthorized",
        code: 403,
        message: "You are not authorized",
      };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  likeAuthz,
};
