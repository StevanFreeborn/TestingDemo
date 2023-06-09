import { ChangeEvent, FormEvent, useState } from 'react';
import { fetchClient } from '../http/fetchClient';
import { authService } from '../services/authService';
import { isNullEmptyOrWhitespace } from '../utils/stringUtils';
import AuthFormContainer from './AuthFormContainer';
import AuthFormErrorContainer from './AuthFormErrorContainer';
import AuthFormHeader from './AuthFormHeader';
import { AuthInput } from './AuthInput';
import styles from './ForgotPasswordForm.module.css';
import AccountIcon from './icons/AccountIcon';
import InfoIcon from './icons/InfoIcon';

function Form({
  submitHandler,
  username,
  userNameChangeHandler,
}: {
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
  username: string;
  userNameChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form onSubmit={submitHandler}>
      <AuthFormHeader header="Forgot Password" />
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
      <hr className={styles.ruler} />
      <p className={styles.usernameInstructions}>
        If you still can&apos;t log in, enter your username to reset your
        password.
      </p>
      <AuthInput
        Icon={AccountIcon}
        type="text"
        placeholder="Username"
        value={username}
        changeHandler={userNameChangeHandler}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.resetEmailButton} type="submit">
          Reset via Email
        </button>
      </div>
    </form>
  );
}

function FormSubmissionConfirmation() {
  return (
    <>
      <AuthFormHeader header="Reset Password" />
      <div className={styles.confirmationText}>
        <p>
          If your account is active, a message will be sent to your email
          address with instructions to reset your password.
        </p>
        <p>
          If you do not receive an email, contact your system administrator.
        </p>
      </div>
    </>
  );
}

export default function ForgotPasswordForm() {
  const client = fetchClient();
  const { sendForgotPasswordEmail } = authService(client);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);

    const formErrors: string[] = [];

    if (isNullEmptyOrWhitespace(username)) {
      formErrors.push('Username is required');
    }

    if (formErrors.length > 0) {
      setErrors(prev => [...prev, ...formErrors]);
      return;
    }

    sendForgotPasswordEmail({ username });
    setIsSubmitted(true);
  }

  return (
    <>
      <AuthFormContainer>
        {isSubmitted ? (
          <FormSubmissionConfirmation />
        ) : (
          <Form
            submitHandler={handleFormSubmit}
            username={username}
            userNameChangeHandler={handleUsernameChange}
          />
        )}
      </AuthFormContainer>
      <AuthFormErrorContainer errors={errors} />
    </>
  );
}
