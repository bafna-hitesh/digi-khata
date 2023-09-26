'use client';

import React from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import StyledComponentsRegistry from './AntdRegistry';
import darkTheme from './Dark';
import lightTheme from './Light';

const AntdProvider = ({ children, theme, isDarkMode }) => (
  <StyledComponentsRegistry>
    <ConfigProvider
      theme={
        isDarkMode
          ? {
              algorithm: antdTheme.darkAlgorithm,
              ...darkTheme,
            }
          : {
              algorithm: antdTheme.defaultAlgorithm,
              ...lightTheme,
            }
      }
    >
      {children}
    </ConfigProvider>
  </StyledComponentsRegistry>
);

export default AntdProvider;
