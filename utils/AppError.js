module.exports = class AppError extends Error {
  statusCode;
  status;
  isOperational;

  constructor(message, statusCode) {
    super(message);
    // Object.setPrototypeOf(this, AppError.prototype);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('5') ? 'error' : 'fail';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
};
