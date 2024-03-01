import React from 'react';
import cx from 'classnames';
import { Card } from 'antd';
import styles from '../Dashboard/Dashboard.module.scss';
import { TradeCardPropsType } from './tradeDetailsCardType';

/**
 * @summary TradeCard component displays the date of the trade, profit and loss (P&L), and the number of trades.
 * @description It dynamically styles the card border based on the P&L:
 * Green border for profit
 * Red border for loss
 * Grey border for neutral (zero profit or loss)
 */

const TradeCard: React.FC<TradeCardPropsType> = ({ trade }) => {
  return (
    <Card.Grid
      className={cx(styles.sub_card, {
        [styles.positive]: trade['P&L'] > 0,
        [styles.negative]: trade['P&L'] < 0,
      })}
      hoverable={false}
    >
      <span className={styles.date_details}>{trade.date}</span>
      <span className={styles.profit_loss_details}>{trade['P&L']}</span>
      <span className={styles.trades_count}>{trade.trades} trades</span>
    </Card.Grid>
  );
};

export default TradeCard;
