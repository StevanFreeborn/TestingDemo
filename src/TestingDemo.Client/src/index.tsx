import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import AnonymousRoute from './components/routes/AnonymousRoute';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import './index.css';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthenticatedRoute />}>
          <Route path="/" element={<App />} />
        </Route>
        <Route element={<AnonymousRoute />}>
          <Route path="/Public">
            <Route
              index
              element={<Navigate to="/Public/Login" replace />}
            ></Route>
            <Route path="Login" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals(console.log);
