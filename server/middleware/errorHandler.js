const errorHandler = (error, request, response, next) => {
  console.log("🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆");
  console.log(error); 
  console.log("🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆");
  switch (error.name) {
    case "Unauthorized":
      response.status(error.code).json({message: error.message})
      break;
    case "SequelizeValidationError":
      const errorMessage1 = error.errors.map(e => e.message)
      response.status(400).json({message: errorMessage1})
      break;
    case "SequelizeUniqueConstraintError":
      const errorMessage2 = error.errors.map(e => e.message)
      response.status(400).json({message: errorMessage2})
      break;
    case "Not Found":
      response.status(error.code).json({message: error.message})
      break;
    case "No token provided":
      response.status(error.code).json({message: error.message})
      break;
    case "Not permitted":
      response.status(error.code).json({message: error.message})
      break;
    default:
      response.status(500).json({message: "Internal server error"})
    break;
  }
}

module.exports = errorHandler

  