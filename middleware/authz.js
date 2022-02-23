const { User } = require("../models/index");
async function authorization(req, res, next) {
  try {
    const { id } = req.currentUser;
    const userId = req.params.id;
    if (+id !== +userId) {
      throw new Error("NOT_ENOUGH_PERMISSION");
    }
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("NOT_ENOUGH_PERMISSION");
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
