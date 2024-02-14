'use client';

import DashboardHeader from '@components/Dashboard/DashboardHeader';
import AnalyticsOverview from '@components/Dashboard/AnalyticsOverview';
import { Layout } from 'antd';
import { useAppSelector } from 'redux/hooks';

const Dashboard = () => {
  // const count = useAppSelector((state) => state);
  // console.log({ count });

  // const dispatch = useDispatch();
  // dispatch(increment());
  return (
    <Layout>
      <DashboardHeader />
      <AnalyticsOverview />
    </Layout>
  );
};

export default Dashboard;
