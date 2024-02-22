'use client';

import AnalyticsOverview from '@components/Dashboard/AnalyticsOverview';
import DashboardHeader from '@components/Dashboard/DashboardHeader';
import { Layout } from 'antd';

const Dashboard = () => {
  return (
    <Layout>
      <DashboardHeader />
      <AnalyticsOverview />
    </Layout>
  );
};

export default Dashboard;
