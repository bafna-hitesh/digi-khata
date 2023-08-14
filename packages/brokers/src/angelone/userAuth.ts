import querystring from 'querystring';
import { baseURL } from './constants';

const loginURLForAngelOne = (apiKey: string): string => {
    let option = {
        api_key: apiKey
    }
    return `${baseURL}?${querystring.stringify(option)}`;
}

export {
    loginURLForAngelOne
}