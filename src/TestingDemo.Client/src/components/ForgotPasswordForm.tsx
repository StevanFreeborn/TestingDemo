import { ChangeEvent, useState } from 'react';
import { AuthInput } from './AuthInput';
import styles from './ForgotPasswordForm.module.css';
import AccountIcon from './icons/AccountIcon';
import InfoIcon from './icons/InfoIcon';

export default function ForgotPasswordForm() {
  const [username, setUsername] = useState('');

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  return (
    <form className={styles.forgotPasswordForm}>
      <div className={styles.headerContainer}>
        <h2>Forgot Password?</h2>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoItem}>
          <InfoIcon className={styles.icon} />
          <p>Verify you&apos;re entering the correct username.</p>
        </div>
        <div className={styles.infoItem}>
          <InfoIcon className={styles.icon} />
          <p>
            Passwords are case sensitive, so ensure you don&apos;t have caps
            lock enabled.
          </p>
        </div>
      </div>
      <hr />
      <p>
        If you still can&apos;t log in, enter your username to reset your
        password.
      </p>
      <AuthInput
        Icon={AccountIcon}
        type="text"
        placeholder="Username"
        value={username}
        changeHandler={handleUsernameChange}
      />
    </form>
  );
}
