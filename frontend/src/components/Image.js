import { useContext } from 'react';
import { StoreContext } from '../state/store';
import { ImageContainer, FullContainer } from './styled';
import useZoom from '../hooks/useZoom';
import usePreventDefault from '../hooks/usePreventDefault';
const Image = () => {
  const { state } = useContext(StoreContext);
  const elementRef = useZoom(1);
  const preventRef = usePreventDefault(['wheel', 'pinch']);
  return (
    <FullContainer>
      <ImageContainer ref={preventRef}>
        {state?.filteredImage?.url && (
          <img
            ref={elementRef}
            src={state.filteredImage?.url}
            alt="uploaded Content"
            style={{ margin: '0 auto' }}
            width={`${state.filteredImage?.width}px`}
            height={`${state.filteredImage?.height}px`}
          />
        )}
      </ImageContainer>
    </FullContainer>
  );
};

export default Image;
