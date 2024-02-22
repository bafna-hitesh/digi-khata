'use client';

import Sidebar from '@components/Sidebar/Sidebar';
import { Layout } from 'antd';

const { Sider } = Layout;

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
