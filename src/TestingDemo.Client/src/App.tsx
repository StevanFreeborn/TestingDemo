import { MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserActions, useUserContext } from './context/UserContext';
import { useAuthService } from './services/authService';

function App() {
  const { state, dispatch } = useUserContext();
  const { refreshToken } = useAuthService();
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
