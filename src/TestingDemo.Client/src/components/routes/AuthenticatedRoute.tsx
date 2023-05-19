import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

export default function AuthenticatedRoute({
  children,
}: {
  children?: JSX.Element;
}): JSX.Element {
  const { userState } = useUserContext();

  if (userState === null) {
    return <Navigate to="/Public/Login" replace />;
  }

  return children ? children : <Outlet />;
}
