module.exports = ENVIRONMENT = {
  APP: {
    PORT: parseInt(process.env.PORT || process.env.APP_PORT || '5000'),
    ENV: process.env.NODE_ENV,
  },
  DB: {
    URI:
      process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV,
  },
  JWT: {
    SECRET_KEY: process.env.JWT_SECRET_KEY,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  },
};
