import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchClient } from '../http/fetchClient';
import { authService } from '../services/authService';
import { isNullEmptyOrWhitespace } from '../utils/stringUtils';
import AuthFormContainer from './AuthFormContainer';
import AuthFormErrorContainer from './AuthFormErrorContainer';
import AuthFormHeader from './AuthFormHeader';
import { AuthInput } from './AuthInput';
import LoginButton from './LoginButton';
import styles from './ResetPasswordForm.module.css';
import AccountIcon from './icons/AccountIcon';
import LockIcon from './icons/LockIcon';

function ResetPasswordExpiration() {
  return (
    <>
      <AuthFormHeader header="Password Reset Expired" />
      <div className={styles.expirationText}>
        <p>
          This password reset link has expired. If you still need to reset your
          password, click the button below.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Link className={styles.resetPasswordLink} to="/Public/ForgotPassword">
          Reset Password
        </Link>
      </div>
    </>
  );
}

function Form({
  submitHandler,
  username,
  password,
  passwordChangeHandler,
  confirmPassword,
  confirmPasswordChangeHandler,
}: {
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
  username: string;
  password: string;
  passwordChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  confirmPassword: string;
  confirmPasswordChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <AuthFormHeader header="Reset Password" />
      <form onSubmit={submitHandler}>
        <AuthInput
          Icon={AccountIcon}
          type="text"
          placeholder="Username"
          value={username}
          readOnly={true}
        />
        <AuthInput
          Icon={LockIcon}
          type="text"
          placeholder="New Password"
          value={password}
          changeHandler={passwordChangeHandler}
        />
        <AuthInput
          Icon={LockIcon}
          type="text"
          placeholder="Verify New Password"
          value={confirmPassword}
          changeHandler={confirmPasswordChangeHandler}
        />
        <div className={styles.buttonContainer}>
          <LoginButton type="submit" />
        </div>
      </form>
    </>
  );
}

export default function ResetPasswordForm() {
  const [isValidated, setIsValidated] = useState(false);
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('t');

  useEffect(() => {
    if (token === null) {
      setIsTokenInvalid(true);
      return;
    }
    const client = fetchClient();
    const { verifyForgotPasswordToken } = authService(client);
    verifyForgotPasswordToken({ token })
      .then(user => {
        setUsername(user.username);
      })
      .catch(error => {
        console.log(error);
        setIsTokenInvalid(true);
      })
      .finally(() => setIsValidated(true));
  }, [token]);

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);
    try {
      const formErrors: string[] = [];

      if (isNullEmptyOrWhitespace(username)) {
        formErrors.push('Username is required');
      }

      if (isNullEmptyOrWhitespace(password)) {
        formErrors.push('The password is required');
      }

      if (password !== confirmPassword) {
        formErrors.push(
          'The verification password does not match the new password'
        );
      }

      if (formErrors.length > 0) {
        setErrors(prev => [...prev, ...formErrors]);
        return;
      }

      // TODO: Attempt to update user password
      // TODO: Attempt to log user in with new password
      // TODO: navigate user to dashboard
    } catch (error) {
      console.log(error);
      // TODO: Decide how to display errors in ui
    }

    setIsSubmitted(true);
  }

  return (
    <>
      <AuthFormContainer>
        {isValidated ? (
          isTokenInvalid ? (
            <ResetPasswordExpiration />
          ) : isSubmitted ? (
            <div>Submitted</div>
          ) : (
            <Form
              submitHandler={handleFormSubmit}
              username={username}
              password={password}
              passwordChangeHandler={handlePasswordChange}
              confirmPassword={confirmPassword}
              confirmPasswordChangeHandler={handleConfirmPasswordChange}
            />
          )
        ) : (
          <div>Validating reset password token...</div>
        )}
      </AuthFormContainer>
      <AuthFormErrorContainer errors={errors} />
    </>
  );
}
