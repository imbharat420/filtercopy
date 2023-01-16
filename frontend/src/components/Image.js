import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../state/store';
import { CanvasContext } from '../state/canvas';
import { ImageContainer, FullContainer, Loading, Spinner } from './styled';

import useZoom from '../hooks/useZoom';
import usePreventDefault from '../hooks/usePreventDefault';
import useFullScreen from '../hooks/useFullScreen';
// import download from '../hooks/useDownload';

const ImageComponent = () => {
  const { state } = useContext(StoreContext);
  const canvasRef = useContext(CanvasContext);

  // const canvasRef = useRef(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(state?.filteredImage?.url);
  }, [state?.filteredImage?.url]);

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

  let factor = useZoom(1, canvasRef);
  const preventRef = usePreventDefault(['wheel', 'pinch']);
  const handleClick = useFullScreen(canvasRef);

  return (
    <FullContainer>
      <ImageContainer ref={preventRef}>
        {state?.filteredImage?.url && (
          <>
            <canvas
              ref={canvasRef}
              width={`${state.filteredImage?.width}px`}
              height={`${state.filteredImage?.height}px`}
              onDoubleClick={handleClick}
            ></canvas>
            {state.loading && (
              <Loading
                width={state.filteredImage?.width}
                height={state.filteredImage?.width}
              >
                <Spinner />
              </Loading>
            )}
          </>
        )}
      </ImageContainer>
    </FullContainer>
  );
};

export default ImageComponent;
