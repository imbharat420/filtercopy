// import { useContext } from 'react';
import { states } from '../state/store';

const socketEvent = {
  connect(socket) {
    console.log(socket.id);
  },
  disconnect() {
    console.log('Socket disconnect');
  },
  // ['mousemove']({ x, y }) {
  //   console.log({ x, y });
  // },
  // ['updatemouse']({ x, y }) {
  //   console.log('backend', { x, y });
  // },

  ['update-image'](image) {
    states.image = image;
  },
};

export default socketEvent;
