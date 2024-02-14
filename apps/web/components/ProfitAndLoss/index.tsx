import { Card } from 'antd';
import LineChart from './LineChart';
import styles from '../Dashboard/Dashboard.module.scss';
import cx from 'classnames';

const ProfitAndLoss = () => {
  return (
    <Card className={cx(styles.card, styles.profit_loss_bg)}>
      <LineChart />
      <h2 className={styles.chart_info}>+245.8</h2>
      <h4 className={styles.card_description}>Profit & Loss</h4>
    </Card>
  );
};

export default ProfitAndLoss;
