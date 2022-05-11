const { errorLogger } = require("../logging/logger");

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
  } else if (
    err.message == "INVALID_TOKEN" ||
    err.name == "JsonWebTokenError"
  ) {
    code = 401;
    msg = "Invalid token";
  } else if (err.message == "QUANTITY_REQUIRED") {
    code = 400;
    msg = "Quantity is required";
  } else if (err.message == "NEED_EMAIL") {
    code = 400;
    msg = "Email is required";
  } else if (err.message == "NEED_PASSWORD") {
    code = 400;
    msg = "Password is required";
  } else if (err.message == "BOOK_NOT_FOUND") {
    code = 404;
    msg = `Book not found`;
  } else {
    msg = err.message;
    errorLogger.error(msg);
  }
  res.status(code).json({ message: msg });
};

module.exports = errorHandler;
