'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App, ConfigProvider } from 'antd';
import darkTheme from 'config/darkTheme';
import { Inter } from 'next/font/google';
import StoreProvider from './StoreProvider';
import './flex.scss';
import './global.scss';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider theme={darkTheme}>
            <StoreProvider>
              <App className='full-width full-height'>{children}</App>
            </StoreProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
