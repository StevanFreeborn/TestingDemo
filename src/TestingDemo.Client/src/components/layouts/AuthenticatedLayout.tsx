import { ReactNode } from 'react';
import SideBar from '../Sidebar';

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        minWidth: '1000px',
        backgroundColor: '#f5f5f5',
        height: '100%',
      }}
    >
      <SideBar />
      <main
        style={{
          flex: '1',
        }}
      >
        {children}
      </main>
    </div>
  );
}
