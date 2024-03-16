import cx from 'classnames';
import { Flex } from 'antd';
import styles from '../Dashboard/Dashboard.module.scss';
import PerformanceByStrategyPagination from './PerformanceByStrategyPagination';
import PerformanceByStrategyList from './PerformanceByMistakeList';

const data = [
  { key: 'Bad fill', profit: '30', loss: '60' },
  { key: 'Bad strike', profit: '50', loss: '20' },
  { key: 'Boredom trade', profit: '80', loss: '20' },
  { key: 'Boredom trade', profit: '80', loss: '20' },
  { key: 'Boredom trade', profit: '80', loss: '20' },
  { key: 'Boredom trade', profit: '80', loss: '20' },
  { key: 'Boredom trade', profit: '80', loss: '20' },
  { key: 'Boredom trade', profit: '80', loss: '20' },
  { key: 'Boredom trade', profit: '80', loss: '20' },
  { key: 'Boredom trade', profit: '80', loss: '20' },
];

const PerformanceByStratergy = () => {
  return (
    <div className={cx(styles.trade_details_card)}>
      {data.map((each) => {
        return (
          <Flex wrap='nowrap'>
            <PerformanceByStrategyList data={each} />
          </Flex>
        );
      })}
      <Flex align='center' vertical>
        <PerformanceByStrategyPagination />
      </Flex>
      <div className={cx(styles.card_footer)}>Performace by stratergy</div>
    </div>
  );
};

export default PerformanceByStratergy;
