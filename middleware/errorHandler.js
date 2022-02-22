const errorHandler = async (err, req, res, next) => {
  let error
  switch (err.name) {
    case 'SequelizeValidationError':
      error = err.errors.map(el => el.message)
      res.status(400).json({message: error[0]})
      break;
    case 'SequelizeUniqueConstraintError':
      error = err.errors.map(el => el.message)
      res.status(400).json({message: error[0]})
      break;
    case 'Unauthorized':
      res.status(err.code).json({message: err.message})
      break;
    case 'JsonWebTokenError':
      res.status(401).json({message: 'Invalid token'})
      break;
    case 'JsonWebTokenError':
      res.status(err.code).json({message: err.message})
      break;
    case 'notFound':
      res.status(err.code).json({message: err.message})
      break;
    case 'Forbidden':
      res.status(err.code).json({message: err.message})
      break;

    default:
      res.status(500).json({
        message: 'Internal server error'
      })
      break;
  }
}

module.exports = errorHandler
