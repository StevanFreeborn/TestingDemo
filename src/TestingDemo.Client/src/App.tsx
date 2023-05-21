import { MouseEvent, useState } from 'react';
import { useFetchClient } from './hooks/useFetchClient';
import { useUserContext } from './hooks/useUserContext';

function App() {
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
    <div>
      <h1>Hello World</h1>
      <button type="button" onClick={handleLogOutClick}>
        Log Out
      </button>
      <button type="button" onClick={handleMakeRequestClick}>
        Make Authorized Request
      </button>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}

export default App;
