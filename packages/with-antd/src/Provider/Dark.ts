import { ThemeConfig, theme as antdTheme } from 'antd';

const { darkAlgorithm } = antdTheme;

const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    colorPrimary: '#e8eaed',
    colorInfo: '#e8eaed',
    fontSize: 14,
    wireframe: true,
    colorBgBase: '#141414',
    colorError: '#F5222D',
    colorSuccess: '#94ff9b',
  },
  components: {
    Layout: {
      bodyBg: 'var(--background)',
      footerBg: 'var(--background)',
      triggerBg: 'var(--background)',
      siderBg: 'var(--background)',
    },
    Button: {
      algorithm: true,
      borderRadius: 2,
      opacityLoading: 0,
      primaryColor: 'rgb(32, 33, 36)',
      colorBgContainer: 'var(--foreground)',
      colorText: 'rgb(32, 33, 36)',
      colorLinkHover: 'rgb(232, 234, 237)',
      colorPrimary: 'var(--foreground)',
    },
    Checkbox: {
      colorPrimary: 'rgb(32, 33, 36)',
      colorPrimaryHover: 'rgb(0, 0, 0)',
    },
    DatePicker: {
      colorPrimary: 'rgb(32, 33, 36)',
    },
    Slider: {
      algorithm: true,
    },
    Badge: {
      colorBgContainer: 'rgb(232, 234, 237)',
      colorBorderBg: 'rgb(254, 254, 255)',
    },
    Carousel: {
      colorBgContainer: 'rgb(232, 234, 237)',
      dotHeight: 5,
    },
    Tree: {
      colorPrimary: 'rgb(0, 0, 0)',
    },
    Spin: {
      colorPrimary: 'var(--foreground)',
    },
  },
};

export default darkTheme;
