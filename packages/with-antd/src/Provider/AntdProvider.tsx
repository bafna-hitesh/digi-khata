'use client';

import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import darkTheme from './Dark';
import lightTheme from './Light';

interface ProviderProps {
  children: ReactNode;
  isDarkMode: boolean;
}

const AntdProvider = ({ children, isDarkMode }: ProviderProps) => {
  const theme = isDarkMode ? darkTheme : lightTheme;
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default AntdProvider;
