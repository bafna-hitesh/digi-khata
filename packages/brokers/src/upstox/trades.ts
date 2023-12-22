import axios from './axiosInstance';

const getAllTradesForTheDay = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const tradeResponse = await axios.get('/order/trades/get-trades-for-day', { headers });
  return tradeResponse?.data;
};

// eslint-disable-next-line import/prefer-default-export
export { getAllTradesForTheDay };
