import axios from 'axios';
import { baseURL } from './constants';

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Kite-Version': 3,
  }
});
