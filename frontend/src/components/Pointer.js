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
        position: 'absolute',
        left: `${coordinates.x * window.innerWidth}px`,
        top: `${coordinates.y * window.innerHeight}px`,
        zIndex: 1000,
      }}
    >
      <img src={PointerIcon} />
    </span>
  );
};

export default Pointer;
