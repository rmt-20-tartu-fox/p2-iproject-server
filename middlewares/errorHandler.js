const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = `Internal server error`;

  if (
    err.name == "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    msg = err.errors.map((el) => el.message);
  } else if (err.message == "NOT_FOUND") {
    code = 401;
    msg = "Invalid email/password";
  }
  res.status(code).json({ message: msg });
};

module.exports = errorHandler;
