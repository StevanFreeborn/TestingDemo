import { MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserActions, useUserContext } from './context/UserContext';
import { useAuthService } from './services/authService';

function App() {
  const { userState, dispatchUserAction } = useUserContext();
  const { refreshToken } = useAuthService();
  const navigate = useNavigate();

  useEffect(() => {
    if (userState === null) {
      return;
    }

    const oneMinuteInMs = 60 * 1000;
    const refreshInterval = userState.expiresIn - oneMinuteInMs;
    const expirationDate = new Date(userState.expiration);
    const timeDiffInMs = expirationDate.getTime() - Date.now();

    if (timeDiffInMs < refreshInterval) {
      refreshToken();
    }

    const interval = setInterval(refreshToken, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshToken, userState]);

  function handleLogOutClick(e: MouseEvent<HTMLButtonElement>) {
    dispatchUserAction({ type: UserActions.LOGOUT });
    navigate('/Public/Login');
  }

  return (
    <div>
      <h1>Hello World</h1>
      <button type="button" onClick={handleLogOutClick}>
        Log Out
      </button>
    </div>
  );
}

export default App;
