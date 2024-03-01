import cx from 'classnames';
import styles from '../Dashboard/Dashboard.module.scss';
import LineChart from './LineChart';
import AccountBalanceFooter from './Footer';
import { WeekdayDataType } from './accountBalanceCardType';

const AccountBalanceDetails = () => {
  const weekdayData: WeekdayDataType[] = [
    { day: 'Monday', amount: 100 },
    { day: 'Tuesday', amount: 150 },
    { day: 'Wednesday', amount: 200 },
    { day: 'Thursday', amount: 180 },
    { day: 'Friday', amount: 220 },
    { day: 'Saturday', amount: 120 },
    { day: 'Sunday', amount: 80 },
  ];
  return (
    <div className={cx(styles.trade_details_card)}>
      <LineChart weekdayData={weekdayData} />
      <AccountBalanceFooter />
    </div>
  );
};

export default AccountBalanceDetails;
