import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { StoreProvider } from './state/store.js';
import { UserProvider } from './state/UserStore.js';

// -- GLOBAL ERROR -- //
// import ErrorBoundary from 'error-boundary-react';
//import AppError from './components/error/AppError';

import ErrorBoundary from './components/error/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <UserProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </UserProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
