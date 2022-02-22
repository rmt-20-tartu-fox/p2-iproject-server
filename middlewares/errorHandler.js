const errorHandler = (error, req, res, next) => {
  console.log(error);
  switch(error.name) {
    case "SequelizeValidationError":
      res.status(400).json({Message: error.errors[0].message})
      break
    case "SequelizeUniqueConstraintError":
      res.status(400).json({Message: error.message})
      break
    case "ValidationError":
      res.status(400).json({Message: error.message})
      break
    case "WrongCredentials":
      res.status(401).json({Message: "Invalid Email/Password"})
      break
    default:
      res.status(500).json({Message: "Internal Server Error"})
  }
}

module.exports = {
  errorHandler
}