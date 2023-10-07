'use client';
import Logo from '@assets/Logo';
import styles from './home.module.scss';
import cx from 'classnames';
import Waitlist from '@components/waitlist';

export default function Page() {
  return (
    <>
      <nav className={styles.header}>
        <div className={styles.headerInner}>
          <a href='/' className='flex-center'>
            <Logo />
            <span className={styles.headerBrandName}>Digi-Khata</span>
          </a>
        </div>
      </nav>
      <main className={styles.main}>
        <header>
          <div className='d-flex'>
            <div className='f1'>
              <h1 className={styles.headerTitle}>You found your edge in the stock market</h1>
              <p className={cx('secondary-text-color', styles.headerSubTitle)}>
                Auto sync trades, Great Analytics, proven performance, data-driven results
              </p>
              <Waitlist />
            </div>
            <div className='f1'>hello</div>
          </div>
        </header>
      </main>
    </>
  );
}
