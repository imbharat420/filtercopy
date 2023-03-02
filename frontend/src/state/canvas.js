import { createContext, useRef, useContext, useEffect } from 'react';
const CanvasContext = createContext();

export const useCanvasContext = () => {
  return useContext(CanvasContext);
};

const CanvasProvider = ({ children }) => {
  const canvasRef = useRef(null);

  return (
    <CanvasContext.Provider value={canvasRef}>
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasContext, CanvasProvider };
