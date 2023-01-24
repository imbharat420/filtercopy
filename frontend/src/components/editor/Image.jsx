import React, { useEffect, useState,useContext } from 'react';


import { CanvasContext } from '../../state/canvas';
import { ImageContainer, FullContainer, Loading, Spinner } from '../styled';

import useZoom from '../../hooks/useZoom';
import usePreventDefault from '../../hooks/usePreventDefault';
import useFullScreen from '../../hooks/useFullScreen';
import useCanvas from '../../hooks/useCanvas';
// import download from '../hooks/useDownload';

 



let URL = `http://localhost:8000/uploads/images/`;

const Image = ({
  currentImage,loading
}) => {
  const canvasRef = useContext(CanvasContext);
  const [url, setUrl] = useState(null);
 
  useEffect(() => {
    setUrl(URL + currentImage?.url);
  }, [currentImage?.url]);

  // ! HOOKS 
  useCanvas(url,canvasRef); //CANVAS RENDER
  let factor = useZoom(1, canvasRef);
  const preventRef = usePreventDefault(['wheel', 'pinch']);
  const handleClick = useFullScreen(canvasRef);

  return (
    <FullContainer>
      <ImageContainer ref={preventRef}>
        {currentImage?.url && (
          <>
            <canvas
              ref={canvasRef}
              width={`${currentImage?.width}px`}
              height={`${currentImage?.height}px`}
              onDoubleClick={handleClick}
            ></canvas>
            {loading && (
              <Loading
                width={currentImage?.width}
                height={currentImage?.height}
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

export default Image;
 