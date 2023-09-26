import { ThemeConfig } from 'antd';

const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#e8eaed',
    colorInfo: '#e8eaed',
    fontSize: 14,
    wireframe: true,
    colorBgBase: '#202124',
    colorError: '#F5222D',
    colorSuccess: '#94ff9b',
  },
  components: {
    Button: {
      algorithm: true,
      borderRadius: 2,
      opacityLoading: 0,
      primaryColor: 'rgb(32, 33, 36)',
      colorBgContainer: 'rgb(255, 255, 255)',
      colorText: 'rgb(32, 33, 36)',
      colorLinkHover: 'rgb(232, 234, 237)',
      colorPrimary: 'rgb(255, 255, 255)',
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
      colorPrimary: 'rgb(255, 255, 255)',
    },
  },
};

export default darkTheme;
