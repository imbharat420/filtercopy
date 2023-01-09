import { useRef, useEffect, useState } from 'react';

function useImageFromUrl(url) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      ctx.drawImage(image, 0, 0);
      setLoading(false);
    };

    image.src = url;
  }, [url]);

  return { canvasRef, loading };
}
export default useImageFromUrl;
