'use client';

import Sidebar from '@components/Sidebar/Sidebar';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Layout hasSider className='full-height'>
      <Sider width='15%'>
        <Sidebar />
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
