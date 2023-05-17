import { Navigate, Outlet } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

export default function AnonymousRoute({
  children,
}: {
  children?: JSX.Element;
}): JSX.Element {
  const userAuth = localStorage.getItem('user');

  if (userAuth !== null) {
    return <Navigate to="/" replace />;
  }

  return <PublicLayout>{children ? children : <Outlet />}</PublicLayout>;
}
