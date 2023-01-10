import { createContext, useRef } from 'react';
const CanvasContext = createContext();
const CanvasProvider = ({ children }) => {
  const canvasRef = useRef(null);
  return (
    <CanvasContext.Provider value={canvasRef}>
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasContext, CanvasProvider };
