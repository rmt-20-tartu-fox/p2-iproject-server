const errorHandler = async (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: 'Invalid token' });
      break;
    case "authentication_fail":
      res.status(err.code).json({ message: err.message });
      break;
    case "not_found":
      res.status(err.code).json({ message: err.message });
      break;
    case "unauthorize":
      res.status(err.code).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: 'Internal server error' });
      break;
  }
};

module.exports = errorHandler;