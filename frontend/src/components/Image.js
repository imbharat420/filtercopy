import React, { useEffect } from 'react';
import { useContext, useRef } from 'react';
import { StoreContext } from '../state/store';
import { ImageContainer, FullContainer } from './styled';
import useZoom from '../hooks/useZoom';
import usePreventDefault from '../hooks/usePreventDefault';

const ImageComponent = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();

    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };

    image.src = state?.filteredImage?.url;
  }, []);

  const { state } = useContext(StoreContext);

  let factor = useZoom(1, canvasRef);
  const preventRef = usePreventDefault(['wheel', 'pinch']);

  return (
    <FullContainer>
      <ImageContainer ref={preventRef}>
        {state?.filteredImage?.url && (
          <canvas
            ref={canvasRef}
            width={`${state.filteredImage?.width}px`}
            height={`${state.filteredImage?.height}px`}
          ></canvas>
        )}
      </ImageContainer>
    </FullContainer>
  );
};

export default ImageComponent;
