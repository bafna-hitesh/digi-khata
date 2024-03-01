import { Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Evalution from '@components/Evalution/Evalution';
import TimeAnalysis from '@components/TimeAnalysis/TimeAnalysis';
import AccountBalanceDetails from '@components/AcountBalanceChart';
import TradeDetails from '@components/TradeDetails';
import TradeDetailsByWeekCol from '@components/TradeDetailsByWeek';
import ProfitFactore from '../ProfitFactore';
import ProfitAndLoss from '../ProfitAndLoss';
import MaxDrawdown from '../MaxDrawdown';
import TradingFrequency from '../TradingFrequency';
import ChargesPaid from '../ChargesPaid';
import styles from './Dashboard.module.scss';

/**
 * @summary display different types of summary analytics
 * @description in a line show profits factors, P&L, Max drawdown, Trading fequency and Charges paid
 * Profit factore: (defn)
 * @returns
 */
const AnalyticsOverview = () => {
  return (
    <Content className={styles.analytics_container}>
      <h1 className={styles.headerTitle}>Analytics Overview</h1>

      <Flex gap='large' wrap='wrap'>
        <ProfitFactore />
        <ProfitAndLoss />
        <MaxDrawdown />
        <TradingFrequency />
        <ChargesPaid />
      </Flex>

      <Flex gap='middle' wrap='wrap'>
        <TradeDetails />
        <AccountBalanceDetails />
        <TradeDetailsByWeekCol />
        <Evalution />
        <TimeAnalysis />
      </Flex>
    </Content>
  );
};

export default AnalyticsOverview;
