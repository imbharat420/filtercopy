import { createContext, useReducer } from 'react';
import { getJWT, saveJWT, clearJWT } from '../utils/LocalAuth';

// Create a provider to wrap your components and provide the state and dispatch functions
export const states = {
  user: {},
  token: getJWT() || undefined,
  loading: false,
  error: null,
};

// Create a context for the state and a reducer for updating the state
const UserContext = createContext();
const reducer = (state = states, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
    case 'REGISTER':
      saveJWT(payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case 'LOAD_USER':
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case 'LOGOUT':
      clearJWT();
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
      };
    case 'ERROR':
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, states);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
