import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: '*',
  },
});

let rooms = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join', (room) => {
    if (!rooms[room]) {
      rooms[room] = [];
    }
    rooms[room].push(socket.id);

    socket.join(room);
    console.log(rooms);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('mousemove', ({ x, y }) => {
    socket.broadcast.emit('updatemouse', { x, y });
  });

  socket.on('image', (image) => {
    console.log('socket', image);
    socket.broadcast.emit('update-image', image);
  });
});

export default io;
