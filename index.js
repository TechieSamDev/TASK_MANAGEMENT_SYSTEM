const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const app = require('./app');

const connectDB = require('./config/db');
const ENVIRONMENT = require('./config/environment');
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('newTask', (task) => {
    io.emit('newTask', task);
  });
});

app.set('io', io);
server.listen(ENVIRONMENT.APP.PORT, async () => {
  console.log(`App running on ${ENVIRONMENT.APP.ENV} environment...`);
  console.log('Environments:', ENVIRONMENT);
  await connectDB();
  console.log(`Server running on port ${ENVIRONMENT.APP.PORT}`);
});

module.exports = { io };
