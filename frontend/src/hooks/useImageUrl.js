import { useState, useEffect } from 'react';

function useImageUrl(initialUrl) {
  const [url, setUrl] = useState(initialUrl);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      setImage(image);
    };
  }, [url]);

  return [image, setUrl];
}

export default useImageUrl;
