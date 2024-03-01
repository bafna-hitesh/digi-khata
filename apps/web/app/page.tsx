'use client';

import Logo from '@assets/DigiKhataLogo';
import HomeTabs from '@components/HomeTabs';
import LoginWithBrokers from '@components/LoginWithBrokers';
import { Layout } from 'antd';
import cx from 'classnames';
import styles from './home.module.scss';

export default function Page() {
  return (
    <Layout>
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
          <div className={cx('d-flex', styles.headerContainer)}>
            <div className='f1'>
              <h1 className={styles.headerTitle}>You found your edge in the stock market</h1>
              <p className={cx('secondary-text-color', styles.headerSubTitle)}>
                Auto sync trades, Great Analytics, proven performance, data-driven results
              </p>
            </div>
            <div className={cx('f1 flex-horizontal-center', styles.brokersContainer)}>
              <LoginWithBrokers />
            </div>
          </div>
        </header>
      </main>
      <section className={styles.main}>
        <h2 className={styles.headerSubTitle}>The Web&apos;s best</h2>
        <HomeTabs />
      </section>
    </Layout>
  );
}

/**
 * https://www.dimension.dev/
 * https://10xdesigners.co/?ref=lapaninja
 * https://webflow.com/
 */
