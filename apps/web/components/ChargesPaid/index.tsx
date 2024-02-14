import { Card } from 'antd';
import styles from '../Dashboard/Dashboard.module.scss';
import cx from 'classnames';
import { PieChart } from './PieChart';

const ChargesPaid = () => {
  return (
    <Card className={cx(styles.card, styles.charges_paid_bg)}>
      <PieChart />
      <h4 className={cx(styles.card_description, styles.text_inverse)}>Charges paid</h4>
    </Card>
  );
};

export default ChargesPaid;
