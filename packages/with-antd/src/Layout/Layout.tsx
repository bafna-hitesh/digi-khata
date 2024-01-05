import { Layout, LayoutProps } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const DigiLayout = (props: LayoutProps) => <Layout className='full-height' {...props} />;

export { Header, Footer, Sider, Content };
export default DigiLayout;
