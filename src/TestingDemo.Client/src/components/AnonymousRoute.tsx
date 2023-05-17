import { Navigate, Outlet } from 'react-router-dom';

export default function AnonymousRoute({
  children,
}: {
  children?: JSX.Element;
}): JSX.Element {
  const userAuth = localStorage.getItem('user');

  if (userAuth !== null) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}
