import { createContext, useReducer } from 'react';

export const states = {
  remotePeer: null,
  connection: null,
  localStream: null,
  remoteStream: null,
  loading: false,
  error: null,
};

const WebRTCContext = createContext();
const reducer = (state = states, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'offer':
      return {
        ...state,
        remotePeer: payload.remotePeer,
        connection: payload.connection,
      };
    case 'answer':
      return { ...state, connection: payload.connection };
    case 'ice-candidate':
      return { ...state, connection: payload.connection };
    case 'leave':
      return {
        ...state,
        remotePeer: null,
        connection: null,
        remoteStream: null,
      };
    case 'SET_LOCAL_STREAM':
      return { ...state, localStream: payload.localStream };
    case 'SET_REMOTE_STREAM':
      return { ...state, remoteStream: payload.remoteStream };
    case 'ERROR':
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

const WebRTCProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, states);
  return (
    <WebRTCContext.Provider value={{ state, dispatch }}>
      {children}
    </WebRTCContext.Provider>
  );
};

export { WebRTCContext, WebRTCProvider };

/*
    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleIceCandidate);
    socket.on('leave', handleLeave);
    socket.on('error', handleError);
*/
