import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import AnonymousRoute from './components/routes/AnonymousRoute';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import PublicRoute from './components/routes/PublicRoute';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import PublicNotFoundPage from './pages/PublicNotFoundPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
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
            <Route path="ResetPassword" element={<ResetPasswordPage />} />
            <Route path="*" element={<PublicNotFoundPage />} />
          </Route>
        </Route>
        <Route element={<AuthenticatedRoute />}>
          <Route path="/*" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
