import { Button, DatePicker, Flex, Layout, Select, Space } from 'antd';
import styles from './Dashboard.module.scss';
const { RangePicker } = DatePicker;

const { Header, Sider, Content } = Layout;

const DashboardHeader = () => {
  return (
    <Header>
      <Flex className={styles.header} justify='space-between' align='center' wrap='wrap'>
        <Select
          defaultValue='all'
          onChange={() => {}}
          options={[
            { value: 'all', label: 'All Brokers combined' },
            { value: 'zerodha', label: 'Zerodha' },
            { value: 'angellist', label: 'Angellist' },
          ]}
        />
        <Flex gap='small'>
          <Select defaultValue='FNO' onChange={() => {}} options={[{ value: 'fno', label: 'FNO' }]} />
          <Select defaultValue='daily' onChange={() => {}} options={[{ value: 'daily', label: 'Daily' }]} />
          <RangePicker />
        </Flex>
      </Flex>
    </Header>
  );
};

export default DashboardHeader;
