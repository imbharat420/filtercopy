import React from 'react';
import ReactDOM from 'react-dom/client';
// import ErrorBoundary from 'error-boundary-react';
import ErrorBoundary from './components/ErrorBoundary';

import './index.css';
import App from './App';
import AppError from './components/Error';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary element={AppError}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
