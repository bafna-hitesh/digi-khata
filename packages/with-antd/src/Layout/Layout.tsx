import { ReactNode } from 'react';
import { Layout } from 'antd';
type Props = {
  children: ReactNode;
};

const DigiLayout = ({ children }: Props) => <Layout>{children}</Layout>;

export default DigiLayout;
