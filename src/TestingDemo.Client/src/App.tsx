import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { UserActions, useUserContext } from './context/UserContext';

function App() {
  const { dispatch } = useUserContext();
  const navigate = useNavigate();

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
