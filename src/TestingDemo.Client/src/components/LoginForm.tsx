import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserActions, useUserContext } from '../context/UserContext';
import { AuthInput } from './AuthInput';
import styles from './LoginForm.module.css';
import AccountIcon from './icons/AccountIcon';
import LockIcon from './icons/LockIcon';

export default function LoginForm() {
  const { dispatch } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({
      type: UserActions.LOGIN,
      payload: {
        expiration: new Date(),
        expiresIn: 1000,
        user: { id: 'test', username: 'test', email: 'test@test.com' },
      },
    });
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
