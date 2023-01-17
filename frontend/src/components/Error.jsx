import { useContext } from 'react';
import { StoreContext } from '../state/store';
import { ErrorWrapper } from './styled';
const Error = () => {
  const { state } = useContext(StoreContext);
  return (
    <ErrorWrapper>
      <h1>{state.error}</h1>
    </ErrorWrapper>
  );
};

export default Error;
