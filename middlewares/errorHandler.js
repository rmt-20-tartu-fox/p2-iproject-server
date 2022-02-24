const errorHandler = (err, req, res, next) => {
  let code = 500
  let msg = "Internal server error"
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    code = 400
    msg = { message: err.errors[0].message }
  } else if (err.message === 'USER_INVALID') {
    code = 401
    msg = { message: "Invalid email/password" }
  } else if (err.name === 'JsonWebTokenError') {
    code = 401
    msg = { message: "Invalid token" }
  } else if (err.message === 'INVALID_TOKEN') {
    code = 401
    msg = { message: "Invalid token" }
  } else if (err.message === 'BAD_REQUEST_EMAIL') {
    code = 400
    msg = { message: "Email is required" }
  } else if (err.message === 'BAD_REQUEST_PASSWORD') {
    code = 400
    msg = { message: "Password is required" }
  } else if (err.message === 'NOT_FOUND') {
    code = 404
    msg = { message: "Data is not found" }
  }
  res.status(code).json(msg)
};

module.exports = { errorHandler };