import styles from '../styles/pages/index.module.css';
import Logo from '@/components/shared/icons/logo';
import { useState, useEffect } from 'react';
import { BasicBtn } from '@/components/shared/buttons/buttons';
import { useComponentEvents } from '@/hooks/events/providers/component-events';

export default function Index() {
  const { componentEvents } = useComponentEvents();
  const [textColor, setTextColor] = useState('black');

  useEffect(() => {
    const event = componentEvents['basic-button']?.event?.type;
    if (event === 'mousedown' || event === 'click') {
      setTextColor('red');
    } else if (event === 'mouseup' || event === 'mouseleave' || event === 'mouseout') {
      setTextColor('black');
    }
    console.log(componentEvents);
  }, [componentEvents]);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.innerWrapper}>
        <header className={styles.headerContainer}>
          <Logo
            className={styles.logo}
            scale={5}
            shadow={'light'}
          />
          <h1
            className={styles.header}
            style={{ color: textColor }}>
            React Hooks Lib
          </h1>
        </header>
        <div className={styles.midSection}>
          <BasicBtn className={styles.btn}>Get started</BasicBtn>
        </div>
      </div>
    </main>
  );
}
