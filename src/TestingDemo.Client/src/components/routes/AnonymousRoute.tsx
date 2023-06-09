import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import PublicLayout from '../layouts/PublicLayout';

export default function AnonymousRoute({
  children,
}: {
  children?: JSX.Element;
}): JSX.Element {
  const { userState } = useUserContext();

  if (userState !== null) {
    return <Navigate to="/" replace />;
  }

  return <PublicLayout>{children ? children : <Outlet />}</PublicLayout>;
}
