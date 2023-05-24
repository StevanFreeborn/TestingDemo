import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';

export default function AuthenticatedRoute({
  children,
}: {
  children?: JSX.Element;
}): JSX.Element {
  const { userState } = useUserContext();

  if (userState === null) {
    return <Navigate to="/Public/Login" replace />;
  }

  return (
    <AuthenticatedLayout>
      {children ? children : <Outlet />}
    </AuthenticatedLayout>
  );
}
