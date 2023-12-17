import axios from './axiosInstance';

const getAllOrdersForTheDay = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const ordersResponse = await axios.get('/order/retrieve-all', { headers });
  return ordersResponse.data;
};

// eslint-disable-next-line import/prefer-default-export
export { getAllOrdersForTheDay };
