import { MouseEvent } from 'react';
import styles from './LoginButton.module.css';

export default function LoginButton({
  type,
  clickHandler,
}: {
  type: 'button' | 'submit';
  clickHandler?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button className={styles.loginButton} type={type} onClick={clickHandler}>
      Login
    </button>
  );
}
