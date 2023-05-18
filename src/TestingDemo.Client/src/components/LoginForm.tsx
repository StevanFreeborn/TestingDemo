import { Link } from 'react-router-dom';
import { AuthInput } from './AuthInput';
import styles from './LoginForm.module.css';
import AccountIcon from './icons/AccountIcon';
import LockIcon from './icons/LockIcon';

export default function LoginForm() {
  return (
    <form>
      <AuthInput Icon={AccountIcon} type="text" placeholder="Username" />
      <AuthInput Icon={LockIcon} type="password" placeholder="Password" />
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
