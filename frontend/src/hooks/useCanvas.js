import { useEffect } from 'react';
const useCanvas = (url, canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();

    image.onload = () => {
      console.log('image onload', image, canvas);
      ctx.drawImage(image, 0, 0);
    };
    console.log('url', url, image);
    image.src = url;
    image.crossOrigin = 'anonymous';
    return () => {
      image.onload = null;
    };
  }, [url, canvasRef]);
};

export default useCanvas;
