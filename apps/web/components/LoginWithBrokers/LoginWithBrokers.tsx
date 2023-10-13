import { memo } from 'react';
import cx from 'classnames';
import ZerodhaLogo from '@assets/ZerodhaLogo';
import styles from './LoginwithBrokers.module.scss';

const LoginWithBrokers = () => {
  return (
    <div className={cx('full-height', styles.container)}>
      <div className='full-width text-center'>
        <h3>Login with your broker</h3>
        <p>and auto sync trades from today !</p>
      </div>
      <div className={cx('flex-horizontal-center gap20', styles.brokersWrapper)}>
        <button disabled type='button'>
          <ZerodhaLogo />
          Zerodha
        </button>
        <button disabled type='button'>
          <ZerodhaLogo />
          Zerodha
        </button>
        <button disabled type='button'>
          <ZerodhaLogo />
          Zerodha
        </button>
      </div>
      <div className={cx('flex-horizontal-center gap20', styles.brokersWrapper)}>
        <button disabled type='button'>
          <ZerodhaLogo />
          Zerodha
        </button>
        <button disabled type='button'>
          <ZerodhaLogo />
          Zerodha
        </button>
        <button disabled type='button'>
          <ZerodhaLogo />
          Zerodha
        </button>
      </div>
    </div>
  );
};

export default memo(LoginWithBrokers);
