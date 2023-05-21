import styles from './AuthFormErrorContainer.module.css';

export default function AuthFormErrorContainer({
  errors,
}: {
  errors: string[];
}) {
  return errors.length > 0 ? (
    <div className={styles.errorContainer}>
      {errors.map((error, i) => (
        <p key={i}>{error}</p>
      ))}
    </div>
  ) : null;
}
