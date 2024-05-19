const { MongooseError } = require('mongoose');
const ENVIRONMENT = require('../config/environment');
const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (ENVIRONMENT.APP.ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (ENVIRONMENT.APP.ENV === 'production') {
    let error = err;
    if (err instanceof MongooseError.CastError)
      error = handleMongooseCastError(err);
    else if (err instanceof MongooseError.ValidationError)
      error = handleMongooseValidationError(err);
    if ('timeout' in err && err.timeout) error = handleTimeoutError();
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (err.code === 11000)
      error = handleMongooseDuplicateFieldsError(err, req, res, next);

    sendErrorProd(error, res);
  }
};

const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err.data,
  });
};

const sendErrorProd = (err, res) => {
  if (err?.isOperational) {
    console.log('Error: ', err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err.data,
    });
  } else {
    console.log('Error: ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

// Error handling functions
function handleMongooseCastError(err) {
  const message = `Invalid ${err.path} value "${err.value}".`;
  return new AppError(message, 400);
}

function handleMongooseValidationError(err) {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

function handleMongooseDuplicateFieldsError(err, req, res, next) {
  const value = Object.keys(err.keyValue)[0];
  return new AppError(
    `Duplicate field value: ${value}. Please use another value!`,
    400
  );
}

function handleTimeoutError() {
  return new AppError('Request timeout', 408);
}

function handleJWTError() {
  return new AppError('Invalid token. Please log in again!', 401);
}

function handleJWTExpiredError() {
  return new AppError('Your token has expired!', 401);
}
