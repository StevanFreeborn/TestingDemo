import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import PublicLayout from '../layouts/PublicLayout';

export default function AnonymousRoute({
  children,
}: {
  children?: JSX.Element;
}): JSX.Element {
  const { state } = useUserContext();

  if (state !== null) {
    return <Navigate to="/" replace />;
  }

  return <PublicLayout>{children ? children : <Outlet />}</PublicLayout>;
}
