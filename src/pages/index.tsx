import styles from '../styles/pages/index.module.css';
import Logo from '@/components/shared/icons/logo';
import { BasicBtn } from '@/components/shared/buttons/buttons';
import { useWindowEvent } from '@/contexts/window-events';
import { useInterval, useTimeout } from '@/hooks/async';

export default function Index() {
  const event = useWindowEvent();

  useInterval(() => {
    console.log('Hello');
  }, 200);

  useTimeout(() => {
    console.log('Now');
  }, 2000);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.innerWrapper}>
        <header className={styles.headerContainer}>
          <Logo
            className={styles.logo}
            scale={5}
            shadow={'light'}
          />
          <h1 className={styles.header}>React Hooks Lib</h1>
        </header>
        <div className={styles.midSection}>
          <BasicBtn className={styles.btn}>Get started</BasicBtn>
        </div>
      </div>
    </main>
  );
}
