const { User } = require('../models');
const { verifyToken, signToken } = require('./jwt');


const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw {
        name: 'JsonWebTokenError'
      };
    }
    req.loginUser = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
