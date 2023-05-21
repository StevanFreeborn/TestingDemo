import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';
import styles from './ResetPasswordForm.module.css';

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

function Form() {
  return (
    <>
      <form></form>
    </>
  );
}

export default function ResetPasswordForm() {
  const [expired, setExpired] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('t');

  useEffect(() => {
    if (token === null) {
      setExpired(true);
    }
  }, [token]);

  return (
    <AuthFormContainer>
      {expired ? (
        <ResetPasswordExpiration />
      ) : submitted ? (
        <div>Submitted</div>
      ) : (
        <Form />
      )}
    </AuthFormContainer>
  );
}
