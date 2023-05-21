import { ReactNode } from 'react';
import logo from '../assets/images/testing-demo-logo.svg';
import styles from './AuthContainer.module.css';

export default function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="TestingDemo" />
        </div>
        {children}
        <div className={styles.copyRightContainer}>
          <p>Copyright &copy; 2023 Made Up, LLC. All rights reserved.</p>
          <p>U.S. Patent No. 00,000,000</p>
        </div>
      </div>
    </div>
  );
}
