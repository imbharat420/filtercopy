import { createContext, useReducer } from 'react';
import data from '../assets/data.json';

// Create a provider to wrap your components and provide the state and dispatch functions
const states = {
  effects: data['sidebar'],
  currentEffect: {},
  loading: false,
  image: {},
  filteredImage: {},
  history: [],
  currentEffectIndex: 0,
  currentZoneIndex: 0,
  currentEffectName: '',
  currentEffectType: '',
  imgLink: '',
  error: '',
};

// Create a context for the state and a reducer for updating the state
const StoreContext = createContext();
const reducer = (state = states, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CHANGE_EFFECT':
      return { ...state, effects: payload, loading: false };
    case 'CHANGE_IMAGE':
      return {
        ...state,
        image: payload,
        filteredImage: payload,
        loading: false,
      };
    case 'CHANGE_FILTER_IMAGE':
      return {
        ...state,
        filteredImage: payload,
        loading: false,
        history: [...state.history, payload],
      };
    case 'SIDEBAR_INDEX':
      return {
        ...state,
        currentEffectIndex: payload,
        currentZoneIndex: 0,
      };
    case 'SIDEBAR_ZONE_INDEX':
      return { ...state, currentZoneIndex: payload };
    case 'LOADING':
      return { ...state, loading: true };
    case 'REMOVE_IMAGE':
      return { ...state, image: {}, filteredImage: {}, history: [] };
    case 'ERROR':
      console.log('error', payload);
      return { ...state, error: payload, loading: false };
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
