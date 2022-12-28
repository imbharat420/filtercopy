import { createContext, useReducer } from 'react';

// Create a provider to wrap your components and provide the state and dispatch functions
const states = {
  effects: [],
  currentEffect: {},
  // images: {
  //   original: '',
  //   edited: [
  //     {
  //       name: 'Artistic',
  //       link: '',
  //     },
  //   ],
  // },
  image: '',
  currentEffectIndex: 0,
  currentEffectName: '',
  currentEffectType: '',
  imgLink: '',
};

// Create a context for the state and a reducer for updating the state
const StoreContext = createContext();
const reducer = (state = states, action) => {
  switch (action.type) {
    case 'CHANGE_EFFECT':
      return { ...state, effects: action.payload };
    case 'CHANGE_IMAGE':
      return { ...state, image: action.payload };
    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, states);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
