const { Movie } = require('../models/index.js');

const authorization = async (req, res, next) => {
  let idMovies = req.params.id;
  let idUserIsSigning = req.userIsSigningIn.id;
  let roleUserIsSigning = req.userIsSigningIn.role;
  try {
    const movie = await Movie.findOne({
      where: {
        id: idMovies,
        authorId: idUserIsSigning
      }
    });
    console.log(movie)
    if (roleUserIsSigning === "Admin" || movie) {
      next()
    } else if (!movie) {
      throw ({
        code: 403,
        name: 'Forbidden',
        msg: 'Cannot access the data'
      })
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
 };

 const authorizationStatus = async (req, res, next) => {
  let idMovies = req.params.id;
  let roleUserIsSigning = req.userIsSigningIn.role;
  try {
    const movie = await Movie.findOne({
      where: {
        id: idMovies
      }
    });
    if (roleUserIsSigning === "Admin" && movie) {
      next()
    } 
    if (roleUserIsSigning === "Staff") {
      throw ({
        code: 403,
        name: 'Forbidden',
        msg: 'Cannot change the status'
      })
    }
  } catch (err) {
    next(err)
  }
 };

module.exports = { authorization,  authorizationStatus  };