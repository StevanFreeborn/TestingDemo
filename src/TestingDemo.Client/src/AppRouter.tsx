import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import AnonymousRoute from './components/routes/AnonymousRoute';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import PublicRoute from './components/routes/PublicRoute';
import ErrorPage from './pages/ErrorPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthenticatedRoute />}>
          <Route path="/" element={<App />} />
        </Route>
        <Route path="/Public">
          <Route element={<AnonymousRoute />}>
            <Route
              index
              element={<Navigate to="/Public/Login" replace />}
            ></Route>
            <Route path="Login" element={<LoginPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="ForgotPassword" element={<ForgotPasswordPage />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
