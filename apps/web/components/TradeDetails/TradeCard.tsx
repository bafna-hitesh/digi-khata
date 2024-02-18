import React from 'react';
import cx from 'classnames';
import styles from '../Dashboard/Dashboard.module.scss';
import { Card } from 'antd';

/**
 * @summary TradeCard component displays the date of the trade, profit and loss (P&L), and the number of trades.
 * @description It dynamically styles the card border based on the P&L:
 * Green border for profit
 * Red border for loss
 * Grey border for neutral (zero profit or loss)
 */

interface Trade {
  date: string;
  'P&L': number;
  trades: number;
}

interface TradeCardProps {
  trade: Trade;
}

const TradeCard: React.FC<TradeCardProps> = ({ trade }) => {
  return (
    <Card.Grid
      className={cx(
        styles.sub_card,
        trade['P&L'] > 0 ? styles.positive : trade['P&L'] < 0 ? styles.negative : styles.idle,
      )}
      hoverable={false}
    >
      <span className={styles.date_details}>{trade.date}</span>
      <span className={styles.profit_loss_details}>{trade['P&L']}</span>
      <span className={styles.trades_count}>{trade.trades} trades</span>
    </Card.Grid>
  );
};

export default TradeCard;
