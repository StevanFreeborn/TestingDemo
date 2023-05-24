import { MouseEvent, useState } from 'react';
import { useFetchClient } from '../hooks/useFetchClient';
import { useUserContext } from '../hooks/useUserContext';

export function DashboardPage() {
  const [user, setUser] = useState(undefined);
  const { userState, logOut } = useUserContext();
  const client = useFetchClient();

  function handleLogOutClick(e: MouseEvent<HTMLButtonElement>) {
    logOut();
  }

  async function handleMakeRequestClick(e: MouseEvent<HTMLButtonElement>) {
    const res = await client.get(
      `https://localhost:5000/api/users/${userState?.user.id}`
    );
    const data = await res.json();
    setUser(data);
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>A Dashboard</h1>
      <button type="button" onClick={handleMakeRequestClick}>
        Make Authorized Request
      </button>
      <button type="button" onClick={handleLogOutClick}>
        Log Out
      </button>
      <div>
        <pre>{JSON.stringify(user)}</pre>
      </div>
    </div>
  );
}
