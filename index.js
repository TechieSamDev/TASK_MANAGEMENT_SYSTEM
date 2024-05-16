const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const connectDB = require('./config/db');
const ENVIRONMENT = require('./config/environment');

app.listen(ENVIRONMENT.APP.PORT, async () => {
  console.log(`App running on ${ENVIRONMENT.APP.ENV} environment...`);
  console.log('Environments:', ENVIRONMENT);
  await connectDB();
  console.log(`Server running on port ${ENVIRONMENT.APP.PORT}`);
});
