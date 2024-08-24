// Custom error class for API errors
class ApiError extends Error {
  // Constructor method to initialize the error instance
  constructor(
    statusCode, // HTTP status code for the error
    message = "Something went wrong", // Default error message
    errors, // Additional error details or validation errors
    stack = "" // Stack trace for debugging
  ) {
    super(message);

    this.statusCode = statusCode; // HTTP status code of the error
    this.data = null; // Additional data associated with the error (optional)
    this.message = message; // Error message
    this.errors = errors; // Additional error details or validation errors
    if (stack) {
      this.stack = stack; // Set the stack trace if provided
    } else {
      Error.captureStackTrace(this, this.constructor); // Capture stack trace if not provided
    }
  }
}

export { ApiError };
