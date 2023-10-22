import { memo } from 'react';
import cx from 'classnames';
import styles from './LoginwithBrokers.module.scss';
import LoginWithZerodha from './LoginWithZerodha';
import LoginWithAngelOne from './LoginWithAngelOne';
import LoginWithIcici from './LoginWithIcici';
import LoginWithUpstox from './LoginWithUpstox';
import LoginWithFivePaisa from './LoginWithFivePaisa';
import LoginWithIIFL from './LoginWithIIFL';

const LoginWithBrokers = () => {
  return (
    <div className={cx('full-height', styles.container)}>
      <div className='full-width text-center'>
        <h3>
          Login with your broker
          <span className={styles.comingSoon}>Coming Soon</span>
        </h3>
        <p>and auto sync trades from today !</p>
      </div>
      <div className={cx('flex-horizontal-center gap20', styles.brokersWrapper)}>
        <LoginWithZerodha />
        <LoginWithAngelOne />
        <LoginWithIcici />
      </div>
      <div className={cx('flex-horizontal-center gap20', styles.brokersWrapper)}>
        <LoginWithUpstox />
        <LoginWithFivePaisa />
        <LoginWithIIFL />
      </div>
    </div>
  );
};

export default memo(LoginWithBrokers);
