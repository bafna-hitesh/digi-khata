import { Card } from 'antd';
import cx from 'classnames';
import styles from '../Dashboard/Dashboard.module.scss';
import TinyColumnChart from './TinyColumnChart';

const MaxDrawdown = () => {
  return (
    <Card className={cx(styles.card, styles.max_drawdown_bg)}>
      <TinyColumnChart />
      <h2 className={styles.chart_info}>-245.8</h2>
      <h4 className={styles.card_description}>Max Drawdown</h4>
    </Card>
  );
};

export default MaxDrawdown;
