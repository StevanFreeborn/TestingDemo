import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import defaultProfilePicture from '../../assets/images/default-profile-picture.png';
import logo from '../../assets/images/testing-demo-logo-180-47.svg';
import ContentIcon from '../icons/ContentIcon';
import GaugeIcon from '../icons/GaugeIcon';
import MagnifyIcon from '../icons/MagnifyIcon';
import ReportIcon from '../icons/ReportIcon';
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
        <div className={styles.navHeaderContainer}>
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
        <div className={styles.navBodyContainer}>
          <div className={styles.navigationContainer}>
            <div className={styles.searchContainer}>
              <input type="text" placeholder="Search All Content"></input>
              <div className={styles.searchIconContainer}>
                <MagnifyIcon className={styles.searchIcon} />
              </div>
            </div>
            <div className={styles.navItemActive}>
              <div className={styles.navItemIconContainer}>
                <GaugeIcon className={styles.navItemIcon} />
              </div>
              <div className={styles.navLink}>Dashboards</div>
            </div>
            <Link to="/Report" className={styles.navLink}>
              <div className={styles.navItem}>
                <div className={styles.navItemIconContainer}>
                  <ReportIcon className={styles.navItemIcon} />
                </div>
                <div className={styles.navLink}>Reports</div>
              </div>
            </Link>
            <Link to="/Content" className={styles.navLink}>
              <div className={styles.navItem}>
                <div className={styles.navItemIconContainer}>
                  <ContentIcon className={styles.navItemIcon} />
                </div>
                <div className={styles.navLink}>Content</div>
              </div>
            </Link>
          </div>
          <div className={styles.gearIconContainer}>
            <div>Gear Icon</div>
          </div>
        </div>
      </nav>
      <main className={styles.mainContainer}>{children}</main>
    </div>
  );
}
