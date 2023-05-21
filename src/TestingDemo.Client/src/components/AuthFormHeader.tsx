import styles from './AuthFormHeader.module.css';

export default function AuthFormHeader({ header }: { header: string }) {
  return (
    <>
      <div className={styles.headerContainer}>
        <h2>{header}</h2>
      </div>
      <hr className={styles.blueRuler} />
    </>
  );
}
