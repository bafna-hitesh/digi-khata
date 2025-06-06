import { BookOutlined, HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    key: 'Dashboard',
    label: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    key: 'Trades',
    label: 'Trades',
    icon: <PieChartOutlined />,
  },
  {
    key: 'Trades',
    label: 'Trades',
    icon: <BookOutlined />,
  },
];

const RouteMenu = () => {
  const handleClick: MenuProps['onClick'] = (e) => {
    console.log('coming in ,.,<', e);
  };
  return <Menu onClick={handleClick} items={items} />;
};

export default RouteMenu;
