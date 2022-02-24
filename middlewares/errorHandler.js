const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json(err.errors[0]);
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json(err.errors[0]);
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "Unauthorized":
      res.status(err.code).json({ message: err.message });
      break;
    case "notFound":
      res.status(404).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  errorHandler,
};
