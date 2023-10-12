import { ThemeConfig } from 'antd';

const light: ThemeConfig = {
  token: {
    colorPrimary: '#202124',
    colorInfo: '#202124',
  },
  components: {
    Menu: {
      algorithm: true,
      controlItemBgActive: 'rgb(32, 33, 36)',
      itemSelectedColor: 'rgb(255, 255, 255)',
      itemActiveBg: 'rgb(255, 255, 255)',
    },
    Steps: {
      controlItemBgActive: 'rgb(204, 204, 204)',
    },
    Carousel: {
      dotHeight: 5,
    },
  },
};

export default light;
