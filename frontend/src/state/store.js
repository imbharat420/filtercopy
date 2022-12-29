import { createContext, useReducer } from 'react';
import data from '../assets/data.json';
console.log(data);
// Create a provider to wrap your components and provide the state and dispatch functions
const states = {
  effects: data['sidebar'],
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
  currentZoneIndex: 0,
  currentEffectName: '',
  currentEffectType: '',
  imgLink: '',
};

// Create a context for the state and a reducer for updating the state
const StoreContext = createContext();
const reducer = (state = states, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case 'CHANGE_EFFECT':
      return { ...state, effects: payload };
    case 'CHANGE_IMAGE':
      return { ...state, image: payload };
    case 'SIDEBAR_INDEX':
      return {
        ...state,
        currentEffectIndex: payload,
        currentZoneIndex: 0,
      };
    case 'SIDEBAR_ZONE_INDEX':
      return { ...state, currentZoneIndex: payload };

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
