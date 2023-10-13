import { memo } from 'react';
import { Input, Button, Form, FormItem } from '@digi/components';
import cx from 'classnames';
import styles from './Waitlist.module.scss';

const Waitlist = () => {
  const handleFinish = () => {};
  return (
    <Form name='waitlist' size='large' className='d-flex gap20' onFinish={handleFinish}>
      <Input name='email' type='email' className={cx('f2', styles.EmailInput)} />
      <FormItem className='f1'>
        <Button htmlType='submit' type='primary' size='large' className={styles.heroActionButton}>
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
      </FormItem>
    </Form>
  );
};

export default memo(Waitlist);
