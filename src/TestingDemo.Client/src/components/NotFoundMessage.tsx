import { useNavigate } from 'react-router-dom';
import styles from './NotFoundMessage.module.css';

export default function NotFoundMessage({
  textColor,
  linkColor,
}: {
  textColor?: string;
  linkColor: string;
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 style={{ color: textColor }} className={styles.heading}>
        Oops! The page you&apos;re trying to view doesn&apos;t exist
      </h2>
      <p style={{ color: textColor }} className={styles.messageText}>
        Go back to the{' '}
        <button
          className={styles.buttonLink}
          style={{ color: linkColor }}
          onClick={() => navigate(-1)}
        >
          previous page
        </button>
      </p>
    </div>
  );
}
