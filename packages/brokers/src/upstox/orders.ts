import axios from './axiosInstance';

const getAllOrdersForTheDay = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return axios.get('/order/retrieve-all', { headers });
};

// eslint-disable-next-line import/prefer-default-export
export { getAllOrdersForTheDay };
