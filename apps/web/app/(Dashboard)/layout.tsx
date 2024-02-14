'use client';

import Sidebar from '@components/Sidebar/Sidebar';
import { Button, DatePicker, Flex, Layout, Select, Space } from 'antd';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Layout hasSider className='full-height'>
      <Sider width='15%'>
        <Sidebar />
      </Sider>
     {children}
    </Layout>
  );
};

export default DashboardLayout;
