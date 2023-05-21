import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchClient } from '../hooks/useFetchClient';
import { useUserContext } from '../hooks/useUserContext';
import { authService } from '../services/authService';
import { isNullEmptyOrWhitespace } from '../utils/stringUtils';
import AuthFormErrorContainer from './AuthFormErrorContainer';
import { AuthInput } from './AuthInput';
import styles from './LoginForm.module.css';
import AccountIcon from './icons/AccountIcon';
import LockIcon from './icons/LockIcon';

export default function LoginForm() {
  const { logIn } = useUserContext();
  const client = useFetchClient();
  const { logUserIn } = authService(client);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);
    try {
      const formErrors: string[] = [];

      if (isNullEmptyOrWhitespace(username)) {
        formErrors.push('Username is required');
      }

      if (isNullEmptyOrWhitespace(password)) {
        formErrors.push('Password is required');
      }

      if (formErrors.length > 0) {
        setErrors(prev => [...prev, ...formErrors]);
        return;
      }

      const authUser = await logUserIn({ username, password });
      logIn(authUser);
      navigate('/');
    } catch (error) {
      let errorMsg = 'An error occurred attempting to login';

      if (error instanceof Error) {
        errorMsg = error.message;
      }

      setErrors(prev => [...prev, errorMsg]);
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
      <AuthFormErrorContainer errors={errors} />
    </form>
  );
}
