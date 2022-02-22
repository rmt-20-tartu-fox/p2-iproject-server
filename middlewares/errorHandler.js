const errorHandler = (error, req, res, next) => {
  switch(error.name) {
    case "SequelizeValidationError":
      res.status(400).json({msg: error.errors[0].message})
      break
    case "SequelizeUniqueConstrainError":
      res.status(400).json({msg: error.message})
      break
    default:
      res.status(500).json({msg: "Internal Server Error"})
  }
}

module.exports = {
  errorHandler
}