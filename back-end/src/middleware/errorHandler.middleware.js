import { statusCode as code } from "../constant.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  res.status(statusCode);

  const errorResponse = {
    title: statusCode === code.SERVER_ERROR ? "Server Error" : "Error",
    message: err.message,
  };

  if (!isProduction) {
    errorResponse.stackTrace = err.stack;
  }

  switch (statusCode) {
    case code.VALIDATION_ERROR:
      errorResponse.title = "Validation Failed";
      break;
    case code.NOT_FOUND:
      errorResponse.title = "Not Found";
      break;
    case code.FORBIDDEN:
      errorResponse.title = "Forbidden";
      break;
    case code.UNAUTHORIZED:
      errorResponse.title = "Unauthorized";
      break;
    case code.SERVER_ERROR:
    default:
      break;
  }

  res.json(errorResponse);
};

export default errorHandler;
