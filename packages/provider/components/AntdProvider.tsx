'use client';

import React from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import StyledComponentsRegistry from './AntdRegistry';
import darkTheme from './Dark';
// import lightTheme from './Light';
const { defaultAlgorithm, darkAlgorithm } = antdTheme;

const AntdProvider = ({ children, theme, isDarkMode }) => (
  <StyledComponentsRegistry>
    <ConfigProvider theme={darkTheme}>{children}</ConfigProvider>
  </StyledComponentsRegistry>
);

export default AntdProvider;
