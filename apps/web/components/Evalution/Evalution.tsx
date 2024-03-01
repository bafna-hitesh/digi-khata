import cx from 'classnames';
import styles from '../Dashboard/Dashboard.module.scss';

const data: { key: string; value: string }[] = [
  { key: 'Reward to Risk Ratio', value: '2:1' },
  { key: 'Avg. Return Multiple', value: '0.00' },
  { key: 'Expectancy', value: '0.00' },
  { key: 'Avg. Winner Performance', value: '0.00%' },
  { key: 'Avg Loser Performance', value: '00%' },
  { key: 'Return', value: '0.00%' },
];

const Evalution = () => {
  return (
    <div className={cx(styles.trade_details_card)}>
      {data.map(({ key, value }) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '0.25px solid #9B9B9B' }}>
            <p>{key}</p>
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Evalution;
