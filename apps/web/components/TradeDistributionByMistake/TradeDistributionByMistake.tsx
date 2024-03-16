import cx from 'classnames';
import { Flex } from 'antd';
import styles from '../Dashboard/Dashboard.module.scss';
import TradeDistributionByMistakeList from './TradeDistributionByMistakeList';
import TradeDistributionByMistakePagination from './TradeDistributionByMistakePagination';

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

const TradeDistributionByMistake = () => {
  return (
    <div className={cx(styles.trade_details_card)}>
      {data.map((each) => {
        return (
          <Flex wrap='nowrap'>
            <TradeDistributionByMistakeList data={each} />
          </Flex>
        );
      })}
      <Flex align='center' vertical>
        <TradeDistributionByMistakePagination />
      </Flex>
      <div className={cx(styles.card_footer)}>Performace by mistake</div>
    </div>
  );
};

export default TradeDistributionByMistake;
