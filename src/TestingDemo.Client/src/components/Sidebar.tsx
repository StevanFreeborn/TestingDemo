import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultProfilePicture from '../assets/images/default-profile-picture.png';
import logo from '../assets/images/testing-demo-logo-180-47.svg';
import styles from './Sidebar.module.css';
import CogIcon from './icons/CogIcon';
import ContentIcon from './icons/ContentIcon';
import GaugeIcon from './icons/GaugeIcon';
import HelpCircleIcon from './icons/HelpCircleIcon';
import LeftArrowIcon from './icons/LeftArrowIcon';
import MagnifyIcon from './icons/MagnifyIcon';
import ReportIcon from './icons/ReportIcon';
import RightArrowIcon from './icons/RightArrowIcon';

function SideBarHeader() {
  const username = 'Stevan';
  const role = 'System Administrator';
  return (
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
  );
}

function SideBarFooter({
  isCollapsed,
  arrowButtonClickHandler,
}: {
  isCollapsed: boolean;
  arrowButtonClickHandler: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className={
        isCollapsed
          ? styles.navFooterContainerCollapsed
          : styles.navFooterContainer
      }
    >
      <div
        onClick={arrowButtonClickHandler}
        title="Collapse"
        className={styles.navItemFooter}
      >
        <button className={styles.navIconFooterContainer}>
          {isCollapsed ? (
            <RightArrowIcon className={styles.navFooterIcon} />
          ) : (
            <LeftArrowIcon className={styles.navFooterIcon} />
          )}
        </button>
      </div>
      <div title="Help" className={styles.navItemFooter}>
        <a
          href="/Help/OnspringDocumentation.htm"
          className={styles.navIconFooterContainer}
        >
          <HelpCircleIcon className={styles.navFooterIcon} />
        </a>
      </div>
      <div title="All Systems Operational" className={styles.navItemFooter}>
        <div className={styles.navIconFooterContainer}>
          <div className={styles.statusIcon}></div>
        </div>
      </div>
    </div>
  );
}

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleCollapseButtonClick(e: MouseEvent<HTMLDivElement>) {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <nav
      className={isCollapsed ? styles.primaryNavCollapsed : styles.primaryNav}
    >
      <SideBarHeader />
      <div className={styles.navBodyContainer}>
        <div className={styles.navigationTopContainer}>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search All Content"></input>
            <div className={styles.searchIconContainer}>
              <MagnifyIcon className={styles.searchIcon} />
            </div>
          </div>
          <div title="Dashboards" className={styles.navItemActive}>
            <div className={styles.navItemIconContainer}>
              <GaugeIcon className={styles.navItemIcon} />
            </div>
            <div className={styles.navLink}>Dashboards</div>
          </div>
          <Link title="Reports" to="/Report" className={styles.navLink}>
            <div className={styles.navItem}>
              <div className={styles.navItemIconContainer}>
                <ReportIcon className={styles.navItemIcon} />
              </div>
              <div className={styles.navLink}>Reports</div>
            </div>
          </Link>
          <Link title="Content" to="/Content" className={styles.navLink}>
            <div className={styles.navItem}>
              <div className={styles.navItemIconContainer}>
                <ContentIcon className={styles.navItemIcon} />
              </div>
              <div className={styles.navLink}>Content</div>
            </div>
          </Link>
        </div>
        <div className={styles.navigationBottomContainer}>
          <Link title="Administration" to="/Admin" className={styles.navLink}>
            <div className={styles.navItem}>
              <div className={styles.gearIconContainer}>
                <CogIcon className={styles.gearIcon} />
              </div>
            </div>
          </Link>
        </div>
      </div>
      <SideBarFooter
        isCollapsed={isCollapsed}
        arrowButtonClickHandler={handleCollapseButtonClick}
      />
    </nav>
  );
}
