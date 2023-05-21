import { ReactNode } from 'react';
import styles from './AuthFormContainer.module.css';

export default function AuthFormContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={styles.container}>{children}</div>;
}
