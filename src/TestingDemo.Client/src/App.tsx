import { MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserActions, useUserContext } from './context/UserContext';
import { useAuthService } from './services/authService';
import { useClient } from './services/httpClient';

function App() {
  const { state, dispatch } = useUserContext();
  const { refreshToken } = useAuthService();
  const client = useClient();

  const navigate = useNavigate();

  useEffect(() => {
    if (state === null) {
      return;
    }
    const interval = setInterval(refreshToken, state.expiresIn - 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, state]);

  function handleLogOutClick(e: MouseEvent<HTMLButtonElement>) {
    dispatch({ type: UserActions.LOGOUT });
    navigate('/Public/Login');
  }

  async function makeRequest() {
    const res = await client.get(
      'https://localhost:5000/api/auth/reset-password'
    );

    console.log(res);
  }

  return (
    <div>
      <h1>Hello World</h1>
      <button type="button" onClick={handleLogOutClick}>
        Log Out
      </button>
      <button type="button" onClick={() => makeRequest()}>
        Make Request
      </button>
    </div>
  );
}

export default App;
