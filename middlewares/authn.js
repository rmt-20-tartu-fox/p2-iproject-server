const { convertTokenToPlayload } = require('../helper/jwt');
const { User } = require('../models/index.js');

const authentication = async (req, res, next) => {
  try {
  const { access_token } = req.headers;
  const payload = convertTokenToPlayload(access_token);
  const user = await User.findByPk(payload.id);
  if (!user) {
    throw new Error('INVALID_TOKEN')
  }
  req.userIsSigningIn = {
    id: user.id,
  }
  next()
  } catch(err) {
    next(err)
  };
};

module.exports = { authentication };