const mongoose = require('mongoose');
const ENVIRONMENT = require('./environment');

module.exports = connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENVIRONMENT.DB.URI);
    console.log(`MongoDB Connected SuccessFully: ${conn.connection.host}`);
  } catch (error) {
    console.error(
      `😈😈 MongoDB Connection Failed Shutting down server.....!: ${error.message}`
    );
    process.exit();
  }
};
