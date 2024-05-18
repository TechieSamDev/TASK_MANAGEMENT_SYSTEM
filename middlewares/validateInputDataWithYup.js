/**
 * This middleware ensures only specified data, defined in 'yup.object', passes through to the next middleware.

 * For example, if a request sends "userDetails" in the request body, 
   this middleware will remove it because "userDetails" is not defined 
   in the yup.object schema.

 * As a result, req.body.userDetails will be undefined in any controller
    in the app unless it has been added to the yup.object.
 */

const yup = require('yup');
const { logTable } = require('../utils/logger');

const validationSchema = yup.object({
  id: yup.string().min(16),

  // Auth
  firstName: yup.string().min(3),
  lastName: yup.string().min(3),
  username: yup.string().min(3),
  email: yup.string().email(),
  password: yup.string().min(5),

  // Task
  title: yup.string().min(3),
  description: yup.string().min(3),
  completed: yup.boolean(),
});

exports.validateInputDataWithYup = async (req, res, next) => {
  try {
    // Validate query body
    const validatedBody = await validationSchema.validate(req.body, {
      stripUnknown: true,
    });
    req.body = validatedBody;

    // Validate query parameters
    const validatedQuery = await validationSchema.validate(req.query, {
      stripUnknown: true,
    });
    req.query = validatedQuery;

    // Validate request params
    const validatedParams = await validationSchema.validate(req.params, {
      stripUnknown: true,
    });
    req.params = validatedParams;

    logTable('Request Body', req.body);
    logTable('Request Query', req.body);
    logTable('Request Params', req.body);

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};