const socketIo = require('socket.io');

let io;

exports.initiateWebsocket = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

exports.io = io;
