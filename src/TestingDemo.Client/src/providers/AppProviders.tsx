import { ReactNode } from 'react';
import { UserContextProvider } from './UserContextProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}
