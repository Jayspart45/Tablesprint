import { statusCode as code } from "../constant.js";

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Determine status code for the error response
  const statusCode = err.statusCode || 500;
  res.status(statusCode);

  // Switch statement to handle different error cases
  switch (statusCode) {
    case code.VALIDATION_ERROR:
      // Send response for validation error
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack, // Include stack trace for debugging
      });
      break;
    case code.NOT_FOUND:
      // Send response for not found error
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case code.FORBIDDEN:
      // Send response for forbidden error
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case code.SERVER_ERROR:
      // Send response for server error
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case code.UNAUTHORIZED:
      // Send response for unauthorized error
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      // Handle other error cases with a generic error response
      res.json({
        title: "Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

export default errorHandler;
