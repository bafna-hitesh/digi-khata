import { AxiosResponse } from "axios";
import axios from './axiosInstance';

interface AllOrders {
  apiKey: string;
  accessToken: string;
  kiteBaseURL: string;
}

const getAllOrdersForTheDay = ({
  apiKey,
  accessToken,
}: AllOrders): Promise<AxiosResponse<any, any>> => {
  let headers = {
    Authorization: `token ${apiKey}:${accessToken}`,
  };

  return axios.get('/orders', { headers });
};

export { getAllOrdersForTheDay };
