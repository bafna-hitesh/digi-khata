import { Card } from 'antd';
import cx from 'classnames';
import styles from '../Dashboard/Dashboard.module.scss';
import GaugeChart from './GaugeChart';

const TradingFrequency = () => {
  return (
    <Card className={cx(styles.card, styles.trading_frequency_bg)}>
      <GaugeChart />
      <h4 className={styles.card_description}>Trading frequency</h4>
    </Card>
  );
};

export default TradingFrequency;
