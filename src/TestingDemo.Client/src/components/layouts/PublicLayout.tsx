import { CSSProperties, ReactNode } from 'react';
import dew from '../../assets/images/publicBackgrounds/dew.jpg';
import kromlau from '../../assets/images/publicBackgrounds/kromlau.jpg';
import marsh from '../../assets/images/publicBackgrounds/marsh.jpg';

export default function PublicLayout({ children }: { children: ReactNode }) {
  const backgroundImages = [dew, kromlau, marsh];
  const backgroundImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  const styles: CSSProperties = {
    background: `url(${backgroundImage})`,
    height: '100vh',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className={styles.container} style={styles}>
      {children}
    </div>
  );
}
