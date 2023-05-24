import { ReactNode } from 'react';
import dew from '../../assets/images/publicBackgrounds/dew.jpg';
import kromlau from '../../assets/images/publicBackgrounds/kromlau.jpg';
import marsh from '../../assets/images/publicBackgrounds/marsh.jpg';
import styles from './PublicLayout.module.css';

export default function PublicLayout({ children }: { children: ReactNode }) {
  const backgroundImages = [dew, kromlau, marsh];
  const backgroundImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  return (
    <div
      className={styles.container}
      style={{ background: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
}
