import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

export default function AuthenticatedRoute({
  children,
}: {
  children?: JSX.Element;
}): JSX.Element {
  const { state } = useUserContext();

  if (state === null) {
    return <Navigate to="/Public/Login" replace />;
  }

  return children ? children : <Outlet />;
}
