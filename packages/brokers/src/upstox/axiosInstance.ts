import axios from 'axios';
import { baseURL } from './constants';

export default axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
    'Api-Version': '2.0',
  },
});
