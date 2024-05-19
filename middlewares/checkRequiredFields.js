const AppError = require('../utils/AppError');

module.exports = checkRequiredFields = ([...requiredFields]) => {
  return (req, res, next) => {
    const missingField = requiredFields.find((field) => !(field in req.body));

    if (missingField)
      throw new AppError(`Field ${missingField} is required.`, 403);

    next();
  };
};
