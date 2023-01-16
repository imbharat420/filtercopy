import React, { useState, useEffect, createRef } from 'react';
import { createPortal } from 'react-dom';
import { socket } from '../socket';
function PointerIcon({ x, y }) {
  const iconRef = createRef();
  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.style.left = `${x}px`;
      iconRef.current.style.top = `${y}px`;
    }
  }, [x, y]);

  return <div ref={iconRef} className="pointer-icon" />;
}

function PointerOverlay() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  socket.on('updatemouse', ({ x, y }) => {
    setCoordinates({ x, y });
    console.log('updatemouse', x, y);
  });
  const pointerIcon = createPortal(
    <PointerIcon x={coordinates.x} y={coordinates.y} />,
    document.body
  );

  return <div className="pointer-overlay">{pointerIcon}</div>;
}

export default PointerOverlay;
