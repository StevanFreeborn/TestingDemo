import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import defaultProfilePicture from '../../assets/images/default-profile-picture.png';
import logo from '../../assets/images/testing-demo-logo-180-47.svg';
import styles from './AuthenticatedLayout.module.css';

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const username = 'Stevan';
  const role = 'System Administrator';
  return (
    <div className={styles.appContainer}>
      <nav className={styles.primaryNav}>
        <div className={styles.brandContainer}>
          <div className={styles.logoContainer}>
            <Link to="/">
              <img alt="testing-demo-logo" src={logo} className={styles.logo} />
            </Link>
          </div>
          <div className={styles.profileContainer}>
            <div className={styles.profilePictureContainer}>
              <img alt="default-profile" src={defaultProfilePicture} />
            </div>
            <div className={styles.profileInfoContainer}>
              <div className={styles.userName}>{username}</div>
              <div className={styles.currentRole}>{role}</div>
            </div>
          </div>
        </div>
      </nav>
      <main className={styles.mainContainer}>{children}</main>
    </div>
  );
}
