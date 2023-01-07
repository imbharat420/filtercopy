import { useContext } from 'react';
import { StoreContext } from '../state/store';
import { ImageContainer } from './styled';

const Image = () => {
  const { state } = useContext(StoreContext);

  return (
    <ImageContainer>
      {state?.filteredImage?.url && (
        <img
          src={state.filteredImage?.url}
          alt="uploaded Content"
          width={`${state.filteredImage?.width}px`}
          height={`${state.filteredImage?.height}px`}
        />
      )}
    </ImageContainer>
  );
};

export default Image;
