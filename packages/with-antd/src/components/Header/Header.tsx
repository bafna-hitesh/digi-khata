import { Layout } from 'antd';
import { ReactNode } from 'react';

const { Header } = Layout;
type Props = {
  children: ReactNode;
};
const DigiHeader = ({ children }: Props) => <Header>{children}</Header>;

export default DigiHeader;
