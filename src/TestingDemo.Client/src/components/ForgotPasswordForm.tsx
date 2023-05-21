import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { isNullEmptyOrWhitespace } from '../utils/stringUtils';
import AuthFormErrorContainer from './AuthFormErrorContainer';
import { AuthInput } from './AuthInput';
import styles from './ForgotPasswordForm.module.css';
import AccountIcon from './icons/AccountIcon';
import InfoIcon from './icons/InfoIcon';

function ForgotPasswordFormContainer({ children }: { children: ReactNode }) {
  return <div className={styles.forgotPasswordContainer}>{children}</div>;
}

function FormHeader({ header }: { header: string }) {
  return (
    <>
      <div className={styles.headerContainer}>
        <h2>{header}</h2>
      </div>
      <hr className={styles.blueRuler} />
    </>
  );
}

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
      <FormHeader header="Forgot Password" />
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
      <FormHeader header="Reset Password" />
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
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);
    try {
      const formErrors: string[] = [];

      if (isNullEmptyOrWhitespace(username)) {
        formErrors.push('Username is required');
      }

      if (formErrors.length > 0) {
        setErrors(prev => [...prev, ...formErrors]);
        return;
      }

      setSubmitted(true);
    } catch (error) {
      let errorMsg = 'An error occurred attempting to login';

      if (error instanceof Error) {
        errorMsg = error.message;
      }

      setErrors(prev => [...prev, errorMsg]);
    }
  }

  return (
    <>
      <ForgotPasswordFormContainer>
        {submitted ? (
          <FormSubmissionConfirmation />
        ) : (
          <Form
            submitHandler={handleFormSubmit}
            username={username}
            userNameChangeHandler={handleUsernameChange}
          />
        )}
      </ForgotPasswordFormContainer>
      <AuthFormErrorContainer errors={errors} />
    </>
  );
}
