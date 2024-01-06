'use client';

import { Layout, Header, Sider, Content } from '@digi/components';

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Layout hasSider>
      <Sider width='10%'>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
