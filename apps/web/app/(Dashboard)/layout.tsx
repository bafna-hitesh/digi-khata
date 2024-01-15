'use client';

import { Layout, Header, Sider, Content } from '@digi/components';
import Sidebar from '@components/Sidebar/Sidebar';

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Layout hasSider>
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
