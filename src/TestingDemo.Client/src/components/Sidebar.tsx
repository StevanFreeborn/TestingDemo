import { MouseEvent, useEffect, useRef, useState } from 'react';
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

function SideBarHeader({ isCollapsed }: { isCollapsed: boolean }) {
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
        {isCollapsed ? null : (
          <div className={styles.profileInfoContainer}>
            <div className={styles.userName}>{username}</div>
            <div className={styles.currentRole}>{role}</div>
          </div>
        )}
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

function SearchInput({ containerPadding }: { containerPadding?: number }) {
  return (
    <div
      style={{ padding: containerPadding }}
      className={styles.searchContainer}
    >
      <input type="text" placeholder="Search All Content"></input>
      <div className={styles.searchIconContainer}>
        <MagnifyIcon className={styles.searchIcon} />
      </div>
    </div>
  );
}

function SearchModalButton() {
  const [isInputDisplayed, setIsInputDisplayed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: globalThis.MouseEvent) {
      if (
        containerRef.current &&
        containerRef.current.contains(e.target as Node) === false
      ) {
        setIsInputDisplayed(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [containerRef, setIsInputDisplayed, isInputDisplayed]);

  function handleButtonClick(e: MouseEvent<HTMLButtonElement>) {
    setIsInputDisplayed(!isInputDisplayed);
  }

  return (
    <div ref={containerRef} className={styles.searchContainerCollapsed}>
      <button
        onClick={handleButtonClick}
        className={styles.searchIconContainerCollapsed}
      >
        <MagnifyIcon className={styles.searchIcon} />
      </button>
      <div
        className={
          isInputDisplayed ? styles.searchSliderSlide : styles.searchSlider
        }
      >
        <SearchInput containerPadding={0} />
      </div>
    </div>
  );
}

function SideBarSearch({ isCollapsed }: { isCollapsed: boolean }) {
  return isCollapsed ? <SearchModalButton /> : <SearchInput />;
}

function SideBarBody({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className={styles.navBodyContainer}>
      <div className={styles.navigationTopContainer}>
        <SideBarSearch isCollapsed={isCollapsed} />
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
      <SideBarHeader isCollapsed={isCollapsed} />
      <SideBarBody isCollapsed={isCollapsed} />
      <SideBarFooter
        isCollapsed={isCollapsed}
        arrowButtonClickHandler={handleCollapseButtonClick}
      />
    </nav>
  );
}
