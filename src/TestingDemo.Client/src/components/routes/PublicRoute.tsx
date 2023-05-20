import { Outlet } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

export default function PublicRoute({
  children,
}: {
  children?: JSX.Element;
}): JSX.Element {
  return <PublicLayout>{children ? children : <Outlet />}</PublicLayout>;
}
