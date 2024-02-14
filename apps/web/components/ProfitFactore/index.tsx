import { Card } from 'antd';
import styles from '../Dashboard/Dashboard.module.scss';
import LiquidChart from '@components/ProfitFactore/LiquidChart';
import cx from 'classnames';

const ProfitFactore = () => {
  return (
    <Card className={cx(styles.card, styles.profit_factore_bg)}>
      <LiquidChart />
      <h4 className={styles.card_description}>Profit factor</h4>
    </Card>
  );
};

export default ProfitFactore;
