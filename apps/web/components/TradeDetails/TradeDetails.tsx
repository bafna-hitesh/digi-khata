import cx from 'classnames';
import styles from '../Dashboard/Dashboard.module.scss';
import { Card } from 'antd';
import TradeCard from './TradeCard';
import TradeFooter from './TradeFooter';

/**
 * @summary Displays trade details including date, profit and loss (P&L), and number of trades.
 * It renders individual TradeCard components for each trade item and a TradeFooter component which have the total summery.
 */

const TradeDetails = () => {
  const dummyData = [
    { date: '2024-02-18', 'P&L': 500.25, trades: 10 },
    { date: '2024-02-17', 'P&L': 320.5, trades: 8 },
    { date: '2024-02-16', 'P&L': -150.75, trades: 5 },
    { date: '2024-02-15', 'P&L': 200.8, trades: 12 },
    { date: '2024-02-14', 'P&L': 100.0, trades: 6 },
    { date: '2024-02-13', 'P&L': 420.3, trades: 9 },
    { date: '2024-02-12', 'P&L': -50.2, trades: 7 },
    { date: '2024-02-11', 'P&L': 350.75, trades: 11 },
    { date: '2024-02-10', 'P&L': 280.9, trades: 8 },
    { date: '2024-02-09', 'P&L': -200.6, trades: 4 },
    { date: '2024-02-08', 'P&L': 0.0, trades: 10 },
    { date: '2024-02-07', 'P&L': 400.2, trades: 13 },
    { date: '2024-02-06', 'P&L': -80.3, trades: 6 },
    { date: '2024-02-05', 'P&L': 220.7, trades: 9 },
    { date: '2024-02-04', 'P&L': 180.6, trades: 7 },
    { date: '2024-02-03', 'P&L': -120.4, trades: 5 },
    { date: '2024-02-02', 'P&L': 300.35, trades: 11 },
    { date: '2024-02-01', 'P&L': 250.25, trades: 8 },
    { date: '2024-01-31', 'P&L': -90.5, trades: 6 },
    { date: '2024-01-30', 'P&L': 180.2, trades: 9 },
  ];

  return (
    <div className={cx(styles.trade_details_card)}>
      <div className={styles.trade_details_main_card}>
        {dummyData.map((trade: any, index: number) => (
          <TradeCard key={index} trade={trade} />
        ))}
      </div>

      <TradeFooter />
    </div>
  );
};

export default TradeDetails;
