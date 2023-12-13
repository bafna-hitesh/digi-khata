import axios from './axiosInstance';

interface AllOrders {
  apiKey: string;
  accessToken: string;
}

const getAllOrdersForTheDay = ({ apiKey, accessToken }: AllOrders) => {
  const headers = {
    Authorization: `token ${apiKey}:${accessToken}`,
  };

  return axios.get('/orders', { headers });
};

export { getAllOrdersForTheDay };
