import { Layout, LayoutProps } from 'antd';
import { ReactNode } from 'react';
import cx from 'classnames';

const { Header } = Layout;
interface Props extends LayoutProps {
  children: ReactNode;
}

const DigiHeader = ({ children, ...rest }: Props) => (
  <Header className={cx('flex-vertical-center', rest?.className)} {...rest}>
    {children}
  </Header>
);

export default DigiHeader;
