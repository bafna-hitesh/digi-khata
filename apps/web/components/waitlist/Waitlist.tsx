import { memo } from 'react';
import Input from '@digi/components/dist/Input';
import Button from '@digi/components/dist/Button';
import styles from './Waitlist.module.scss';

const Waitlist = () => (
  <div className='d-flex gap20'>
    <Input size='large' placeholder='Enter your email address' />
    <Button type='primary' size='large' className={styles.heroActionButton}>
      Join Waitlist
      <div className={styles.heroActionButtonFrames}>
        <div className={styles.heroActionButtonFrame}>
          <div />
        </div>
        <div className={styles.heroActionButtonFrame}>
          <div />
        </div>
        <div className={styles.heroActionButtonFrame}>
          <div />
        </div>
      </div>
    </Button>
  </div>
);

export default memo(Waitlist);
