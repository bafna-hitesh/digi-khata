import { Card, Col, Flex, Grid, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from './Dashboard.module.scss';
import ProfitFactore from '../ProfitFactore';
import ProfitAndLoss from '../ProfitAndLoss';
import MaxDrawdown from '../MaxDrawdown';
import TradingFrequency from '../TradingFrequency';
import ChargesPaid from '../ChargesPaid';
import TradeDetails from '@components/TradeDetails';

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
      </Flex>
    </Content>
  );
};

export default AnalyticsOverview;
