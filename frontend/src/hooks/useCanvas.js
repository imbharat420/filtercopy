import { useEffect } from 'react';
const useCanvas = (url, canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();

    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };

    image.src = url;
    image.crossOrigin = 'anonymous';
  }, [url]);
};

export default useCanvas;
