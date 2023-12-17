import axios from './axiosInstance';

interface AllOrders {
  apiKey: string;
  accessToken: string;
}

const getAllOrdersForTheDay = async ({ apiKey, accessToken }: AllOrders) => {
  const headers = {
    Authorization: `token ${apiKey}:${accessToken}`,
  };
  const ordersResponse = await axios.get('/orders', { headers });
  return ordersResponse.data;
};

// eslint-disable-next-line import/prefer-default-export
export { getAllOrdersForTheDay };
