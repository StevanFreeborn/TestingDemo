import { Link } from 'react-router-dom';
import { ReactComponent as AccountIcon } from '../assets/images/icons/account.svg';
import { ReactComponent as LockIcon } from '../assets/images/icons/lock.svg';
import logo from '../assets/images/testing-demo-logo.svg';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="TestingDemo" />
        </div>
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
            <Link
              className={styles.forgotPasswordLink}
              to="/Public/ForgotPassword"
            >
              Forgot Password?
            </Link>
            <button className={styles.loginButton} type="submit">
              Login
            </button>
          </div>
        </form>
        <div className={styles.copyRightContainer}>
          <p>Copyright &copy; 2023 Made Up, LLC. All rights reserved.</p>
          <p>U.S. Patent No. 00,000,000</p>
        </div>
      </div>
    </div>
  );
}
