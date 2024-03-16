import cx from 'classnames';
import styles from '../Dashboard/Dashboard.module.scss';
import LineChart from './LineChart';
import { WeekdayDataType } from './accountBalanceCardType';
import CapitalUsePerTradeVsProfitFooter from './CapitalUsePerTradeVsProfitFooter';

const CapitalVsProfitDetails = () => {
  const weekdayData: WeekdayDataType[] = [
    { day: '1%', amount: 100 },
    { day: '2%', amount: 150 },
    { day: '3%', amount: 200 },
    { day: '4%', amount: 180 },
    { day: '5%', amount: 220 },
    { day: '6%', amount: 120 },
    { day: '7%', amount: 80 },
  ];
  return (
    <div className={cx(styles.trade_details_card)}>
      <LineChart weekdayData={weekdayData} />
      <CapitalUsePerTradeVsProfitFooter />
    </div>
  );
};

export default CapitalVsProfitDetails;
