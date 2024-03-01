import cx from 'classnames';
import { Column } from '@ant-design/charts';
// import TradeFooter from './TradeFooter';
import styles from '../Dashboard/Dashboard.module.scss';
import tradeDetailsByWeekColConfig from './tradeDetailsByWeekConfig';
import WeekdayDataType from './tradeDetailsByWeekType';

/**
 * @summary Displays trade details including date, profit and loss (P&L), and number of trades.
 * It renders individual TradeCard components for each trade item and a TradeFooter component which have the total summery.
 */

const TradeDetailsByWeekCol = () => {
  const weekdayData: WeekdayDataType[] = [
    { day: 'Monday', amount: 100 },
    { day: 'Tuesday', amount: 150 },
    { day: 'Wednesday', amount: 200 },
    { day: 'Thursday', amount: 180 },
    { day: 'Friday', amount: 220 },
    { day: 'Saturday', amount: 120 },
    { day: 'Sunday', amount: 80 },
  ];

  const config = tradeDetailsByWeekColConfig(weekdayData);
  return (
    <div className={cx(styles.trade_details_card)}>
      <Column {...config} />
      {/* <div className={styles.trade_details_main_card}> */}
      {/* </div> */}
      {/* <TradeFooter /> */}
    </div>
  );
};

export default TradeDetailsByWeekCol;
