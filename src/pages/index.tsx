import styles from '../styles/pages/index.module.css';
import Logo from '@/components/shared/icons/logo';
import { useState, useEffect } from 'react';
import { BasicBtn } from '@/components/shared/buttons/buttons';
import { useComponentEvents } from '@/hooks/events/providers/component-events';
import Wow from './wow';

export default function Index() {
  const { events } = useComponentEvents();
  const [textColor, setTextColor] = useState('black');

  useEffect(() => {
    const basicBtnEvent = events.basicButton?.event?.type;
    console.log(events);
    if (basicBtnEvent === 'mousedown') {
      setTextColor('grey');
    } else if (basicBtnEvent === 'mouseout' || basicBtnEvent === 'mouseup') {
      setTextColor('black');
    }
  }, [events.basicButton]);

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
            style={{ color: textColor, transition: 'color 0.2s ease-in' }}>
            React Hooks Lib
          </h1>
        </header>
        <div className={styles.midSection}>
          <BasicBtn className={styles.btn}>Get started</BasicBtn>
          <Wow />
        </div>
      </div>
    </main>
  );
}
