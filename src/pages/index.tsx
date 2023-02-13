import styles from '../styles/pages/index.module.css';
import Logo from '@/components/shared/icons/logo';
import { useState, useEffect, useRef } from 'react';
import { BasicBtn } from '@/components/shared/buttons/buttons';
import { useAppEvents } from '@/hooks/events/providers/app-events';
import { useRenderCounter } from '@/hooks/dev/render';
import Shapes from './shapes/shapes';

export default function Index() {
  const { events } = useAppEvents();
  const [textColor, setTextColor] = useState('black');
  const renderCount = useRenderCounter();

  useEffect(() => {
    if (events.basicButton) {
      const basicBtnEvent = events.basicButton.type;
      if (basicBtnEvent === 'mousedown') setTextColor('grey');
      else if (basicBtnEvent === 'mouseout' || basicBtnEvent === 'mouseup')
        setTextColor('black');
    }
    if (events.happyButton) {
      const happyBtnEvent = events.happyButton.type;
      if (happyBtnEvent === 'mousedown') setTextColor('red');
      else if (happyBtnEvent === 'mouseout' || happyBtnEvent === 'mouseup')
        setTextColor('black');
    }
  }, [events]);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.innerWrapper}>
        <header className={styles.headerContainer}>
          <Logo
            eventId='logo'
            listeners={['click', 'mouseover']}
            className={styles.logo}
            scale={5}
            shadow={'light'}
          />
          <h1
            className={styles.header}
            style={{ color: textColor, transition: 'color 0.2s ease-in' }}>
            React Hooks Lib
          </h1>
          <p>App re rendered {renderCount} times</p>
        </header>
        <div className={styles.midSection}>
          <BasicBtn
            eventId='basicButton'
            listeners={['mousedown', 'mouseup', 'click']}
            className={styles.btn}>
            First button
          </BasicBtn>
          <BasicBtn
            eventId='happyButton'
            listeners={['mousedown', 'mouseup', 'click']}
            className={styles.btn}>
            Second button
          </BasicBtn>
          <Shapes />
        </div>
      </div>
    </main>
  );
}
