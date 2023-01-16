import { io } from 'socket.io-client';
import socketEvent from './socketEvent';
let socket = undefined;
let soc = undefined;
const runListener = (event, data) => {
  const handler = socketEvent[event];
  if (!(handler instanceof Function)) {
    return console.warn('No handler found for ' + event);
  }

  handler(data?.data ?? data);
};

export const connect = () => {
  if (socket) return console.log(`Socket already connected`);
  socket = true;

  const soc = io('http://localhost:8000', {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 2500,
    reconnectionAttempts: Infinity,
  });

  soc.on('connect', () => {
    socket = soc;
    console.log('connect');
    runListener('connect', soc);
  });

  soc.on('disconnect', () => {
    socket = undefined;
    console.log('disconnect');
    runListener('disconnect', soc);
  });

  soc.onAny(runListener);
};

let updateSocket = () => {
  try {
    if (!socket) connect();
    if (socket) socket?.disconnect();
  } catch {
    console.error('Something went wrong in setSocket');
  }
};

export { updateSocket, socket };

/*
socket.onAny(runListener);

socket.on('*', (eventName, data) => {
  console.log(eventName, data);
  runListener(eventName, data);
});
*/
