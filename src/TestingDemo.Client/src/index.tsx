import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';
import { UserContextProvider } from './context/UserContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <AppRouter />
    </UserContextProvider>
  </React.StrictMode>
);

reportWebVitals(console.log);
