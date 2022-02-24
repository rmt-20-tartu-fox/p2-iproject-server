const errorHandler = (err, req, res, next) => {
  let status, message;
  switch (err.name) {
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeDatabaseError":
      status = 400;
      message = err;
      break;
    case "MulterError":
      status = 400;
      message = "Maximum photo is 5";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;
    case "AUTHENTICATION_FAILED":
      status = 401;
      message = "Invalid token";
      break;
    case "FORBIDDEN_NOT_CUSTOMER":
      status = 403;
      message = "You Are Not Customer";
      break;
    case "FORBIDDEN_NOT_OWNER":
      status = 403;
      message = "You Are Not the Owner";
      break;
    case "FORBIDDEN":
      status = 403;
      message = "You are not authorized";
      break;
    case "NOT_FOUND":
      status = 404;
      message = "Data not found";
      break;
    case "INVALID_USER":
      status = 400;
      message = "Email/Username is required";
      break;
    case "INVALID_PASSWORD":
      status = 400;
      message = "password is required";
      break;
    case "INVALID_USER":
      status = 400;
      message = "Invalid email/password";
      break;
    case "PASSWORD_NOT_MATCH":
      status = 400;
      message = "Please Enter Correct Current Password";
      break;
    case "USER_NOT_FOUND":
      status = 404;
      message = "User not found";
      break;
    default:
      console.log(err);
      status = 500;
      message = "Internal server error";
      break;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
