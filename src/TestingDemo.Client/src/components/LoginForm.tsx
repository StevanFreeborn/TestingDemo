import { Link } from 'react-router-dom';
import { ReactComponent as AccountIcon } from '../assets/images/icons/account.svg';
import { ReactComponent as LockIcon } from '../assets/images/icons/lock.svg';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  return (
    <form>
      <div className={styles.formGroup}>
        <div className={styles.iconContainer}>
          <AccountIcon className={styles.icon} />
        </div>
        <input type="text" placeholder="Username" />
      </div>
      <div className={styles.formGroup}>
        <div className={styles.iconContainer}>
          <LockIcon className={styles.icon} />
        </div>
        <input type="password" placeholder="Password" />
      </div>
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
