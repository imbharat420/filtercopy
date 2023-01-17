import { createContext, useReducer } from 'react';

// Create a provider to wrap your components and provide the state and dispatch functions
export const states = {
  user: {},
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
      return { ...state, effects: payload, loading: false };
    case 'ERROR':
      console.log('error', payload);
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
