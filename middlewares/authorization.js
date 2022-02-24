const { Deck } = require('../models');

const authorize = async (req, res, next) => {
  try {
    const userId = req.loginUser.id;
    const result = await Deck.findOne({ where: { UserId: userId } });
    if (!result) {
      throw {
        name: 'unauthorize',
        code: 403,
        message: "You are not authorized"
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorize;