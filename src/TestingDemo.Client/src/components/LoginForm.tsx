import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserActions, useUserContext } from '../context/UserContext';
import { useAuthService } from '../services/authService';
import { AuthInput } from './AuthInput';
import styles from './LoginForm.module.css';
import AccountIcon from './icons/AccountIcon';
import LockIcon from './icons/LockIcon';

export default function LoginForm() {
  const { dispatchUserAction } = useUserContext();
  const { logUserIn } = useAuthService();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const authUser = await logUserIn({ username, password });
      dispatchUserAction({
        type: UserActions.LOGIN,
        payload: authUser,
      });
      navigate('/');
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <AuthInput
        Icon={AccountIcon}
        type="text"
        placeholder="Username"
        value={username}
        changeHandler={handleUsernameChange}
      />
      <AuthInput
        Icon={LockIcon}
        type="password"
        placeholder="Password"
        value={password}
        changeHandler={handlePasswordChange}
      />
      <div className={styles.actionsContainer}>
        <Link className={styles.forgotPasswordLink} to="/Public/ForgotPassword">
          Forgot Password?
        </Link>
        <button className={styles.loginButton} type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
