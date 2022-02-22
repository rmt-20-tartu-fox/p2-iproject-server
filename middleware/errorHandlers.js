function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal server error";
  if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = "Email must be unique";
  } else if (err.name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors[0].message;
  } else if (err.message === "INVALID_EMAIL_OR_PASSWORD") {
    code = 401;
    msg = "Invalid email or password";
  } else if (err.message === "INVALID_USER_OR_TOKEN" || err.name === "JsonWebTokenError") {
    code = 401;
    msg = "Invalid user or token";
  }
  console.log("here==============", err);
  res.status(code).json({ message: msg });
}

module.exports = errorHandler;
