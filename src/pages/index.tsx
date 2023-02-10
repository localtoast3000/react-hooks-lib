import styles from '../styles/pages/index.module.css';
import Logo from '@/components/shared/icons/logo';

export default function Index() {
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
          <button className={styles.btn}>Get started</button>
        </div>
      </div>
    </main>
  );
}
