import axios from './axiosInstance';

const getAllTradesForTheDay = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return axios.get('/order/trades/get-trades-for-day', { headers });
};

// eslint-disable-next-line import/prefer-default-export
export { getAllTradesForTheDay };
