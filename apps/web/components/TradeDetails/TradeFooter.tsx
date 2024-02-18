import styles from '../Dashboard/Dashboard.module.scss';

/**
 * @summary Footer section for trade details.
 * It displays the total number of trades, wins, losses, and win rate.
 */

const TradeFooter = () => {
  return (
    <div className={styles.trade_details_footer}>
      <div className={styles.trade_count}>
        <span>536</span>
        <span className={styles.trade_count_subtitle}>No. of trades</span>
      </div>
      <div className={styles.win_count}>
        <span>433</span>
        <span className={styles.trade_count_subtitle}>Wins</span>
      </div>
      <div className={styles.loss_count}>
        <span>103</span>
        <span className={styles.trade_count_subtitle}>Loses</span>
      </div>
      <div className={styles.win_rate}>
        <span>+53%</span>
        <span className={styles.trade_count_subtitle}>Win rate</span>
      </div>
    </div>
  );
};
export default TradeFooter;
