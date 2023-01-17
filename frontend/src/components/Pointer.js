import { useState } from 'react';
import PointerIcon from '../assets/pointer.png';
import { socket } from '../socket';

const Pointer = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  socket.on('updatemouse', ({ x, y }) => {
    setCoordinates({ x, y });
  });

  return (
    <span
      style={{
        position: 'fixed',
        left: `${coordinates.x * window.innerWidth}px`,
        top: `${coordinates.y * window.innerHeight}px`,
        zIndex: 1000,
      }}
    >
      <img src={PointerIcon} alt="mouse pointer" />
    </span>
  );
};

export default Pointer;
