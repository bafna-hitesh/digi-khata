'use client';

import React from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

const lightTheme = {
  token: {
    colorPrimary: '#000',
    wireframe: true,
    borderRadius: 2,
    fontSize: 12,
  },
  components: {
    Steps: {
      navArrowColor: 'rgba(0, 0, 0, 0.25)',
      colorText: 'rgba(0, 0, 0, 0.88)',
      wireframe: 'true',
    },
  },
};

const darkTheme = {
  token: {
    colorPrimary: '#fff',
    wireframe: true,
    borderRadius: 2,
    fontSize: 12,
  },
  components: {
    Button: {
      colorPrimary: '#ffffff',
      colorText: 'rgba(255, 255, 255, 0.85)',
      colorTextLightSolid: '#000',
    },
    Steps: {
      colorPrimary: '#ffffff',
      colorText: 'rgba(255, 255, 255, 0.85)',
      colorTextLightSolid: '#000',
    },
    Checkbox: {
      colorText: 'rgba(255, 255, 255, 0.85)',
      colorPrimary: '#fff',
      colorWhite: '#000',
    },
  },
};

const AntdProvider = ({ children, theme, isDarkMode }) => (
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
);

export default AntdProvider;
