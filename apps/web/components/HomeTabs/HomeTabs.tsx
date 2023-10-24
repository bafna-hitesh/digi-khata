import { memo, useState, KeyboardEvent } from 'react';
import cx from 'classnames';
import styles from './HomeTabs.module.scss';
import Tabs from './Tabs';
import TabAnalytics from './Analytics';
import Journal from './Journal';

const HomeTabs = () => {
  const [activeTab, changeActiveTab] = useState(Tabs[0]);
  return (
    <div className='flex-center flex-direction-column'>
      <div className='d-flex gap20'>
        {Tabs.map((key) => (
          <div
            key={key}
            role='tab'
            aria-selected='true'
            tabIndex={0}
            data-node-key={key}
            onClick={() => changeActiveTab(key)}
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
              if (event.key === 'Enter') changeActiveTab(key);
            }}
            className={cx(styles.tabs, {
              [styles.isSelected]: activeTab === key,
            })}
          >
            {key}
          </div>
        ))}
      </div>
      <div className='full-width'>
        {activeTab === 'Analytics' && <TabAnalytics />}
        {activeTab === 'Journal' && <Journal />}
      </div>
    </div>
  );
};

export default memo(HomeTabs);
