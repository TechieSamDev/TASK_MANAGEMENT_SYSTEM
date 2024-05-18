const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const ENVIRONMENT = require('../config/environment.js');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // For Development
  console.log(req.headers.authorization || req.headers.Authorization);
  console.log(req.cookies);
  if (
    (req.headers.authorization || req.headers.Authorization) &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req?.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) throw new AppError('You are not logged in!', 401);

  const decoded = jwt.verify(token, ENVIRONMENT.JWT.SECRET_KEY);

  const user = await User.findById(decoded.id);
  if (!user)
    throw new AppError(
      'Token bearer no longer exists. Please login again',
      401
    );

  const { _id, ...userDetails } = user._doc;
  req.user = { id: _id, ...userDetails };
  next();
});
