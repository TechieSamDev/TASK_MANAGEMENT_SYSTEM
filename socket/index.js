const socketio = require('socket.io');

module.exports = setupSocket = (server) => {
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('newTask', (task) => {
      io.emit('newTask', task);
    });

    socket.on('taskUpdate', (task) => {
      io.emit('taskUpdate', task);
    });

    socket.on('taskDelete', (task) => {
      io.emit('taskDelete', task);
    });
  });

  return io;
};
