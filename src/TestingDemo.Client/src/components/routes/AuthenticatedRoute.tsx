import { Navigate, Outlet } from 'react-router-dom';

export default function AuthenticatedRoute({
  children,
}: {
  children?: JSX.Element;
}): JSX.Element {
  const userAuth = localStorage.getItem('user');

  if (userAuth === null) {
    return <Navigate to="/Public/Login" replace />;
  }

  return children ? children : <Outlet />;
}
