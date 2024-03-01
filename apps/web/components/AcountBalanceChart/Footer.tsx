import styles from '../Dashboard/Dashboard.module.scss';

const AccountBalanceFooter = () => {
  return (
    <div className={styles.trade_details_footer}>
      <div className={styles.trade_count}>
        <span>200000.00</span>
        <span className={styles.trade_count_subtitle}>Starting balance</span>
      </div>
      <div className={styles.win_count}>
        <span>103000.00</span>
        <span className={styles.trade_count_subtitle}>Latest balance</span>
      </div>
      <div className={styles.loss_count}>
        <span>+53%</span>
        <span className={styles.trade_count_subtitle}>Percentage change</span>
      </div>
    </div>
  );
};
export default AccountBalanceFooter;
