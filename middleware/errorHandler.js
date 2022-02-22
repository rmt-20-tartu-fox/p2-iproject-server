const Helper = require("../helper/helper.js");

function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "ReferenceError":
      res.status(403).json({ message: err.errors[0].message });
      break;
    case "Unauthorized":
      res.status(err.code).json({ message: err.message });
      break;
    case "Forbidden":
      res.status(err.code).json({ message: err.message });
      break;
    case "NotFound":
      res.status(err.code).json({ message: err.message });
      break;

    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
}

module.exports = errorHandler;
