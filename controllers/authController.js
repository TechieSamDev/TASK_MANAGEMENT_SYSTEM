const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

const signToken = (id, config) => {
  return jwt.sign({ id }, config.secretKey, {
    expiresIn: config.expiresIn,
  });
};
// Register a new user
exports.register = catchAsync(async (req, res) => {
  if (!req.body.username || !req.body.password)
    throw new AppError('Incomplete Register data (username & password)', 400);

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  user.password = undefined;
  
  return res.status(200).json({
    status: 'success',
    message: 'User Created successfully',
    user,
  });
});

// Login a user
exports.login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.matchPassword(password)))
    throw new AppError('Invalid credentials', 400);

  const jwt = signToken(user._id, {
    secretKey: ENVIRONMENT.JWT.SECRET_KEY,
    expiresIn: ENVIRONMENT.JWT.EXPIRES_IN,
  });

  res.cookie('jwt', jwt, {
    httpOnly: true,
  });

  res.status(200).json({
    message: 'Logged in successfully',
    token: jwt,
    status: 'success',
  });
});
