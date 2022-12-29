import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { StoreContext } from '../state/store';
const Image = () => {
  const { state } = useContext(StoreContext);
  const [data, setData] = useState([]);

  return (
    <ImageContainer>
      {state?.image && <img src={state.image.url} alt="Selected image" />}
    </ImageContainer>
  );
};

export default Image;

const ImageContainer = styled.div`
  padding: 2rem;
  width: 100%;
  height: 100%;
  bacground: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100%;
  }
`;
