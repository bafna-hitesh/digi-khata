import { Card } from 'antd';
import { Gauge, Pie } from '@ant-design/charts';
import styles from '../Dashboard/Dashboard.module.scss';
import cx from 'classnames';
import { gaugeChartConfig } from './gaugeChartConfig';
import GaugeChart from './GaugeChart';

const TradingFrequency = () => {
  const config = gaugeChartConfig();

  return (
    <Card className={cx(styles.card, styles.trading_frequency_bg)}>
      <GaugeChart />
      <h4 className={styles.card_description}>Trading frequency</h4>
    </Card>
  );
};

export default TradingFrequency;
