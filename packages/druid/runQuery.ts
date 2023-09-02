import axios from 'axios';

function runQuery(routerURL: string, query: string, parameters: Array<object>) {
  let headers = {
    'Content-Type': 'application/json'
  }
  return axios.post(routerURL + '/druid/v2/sql', { query, parameters }, { headers });
}

export default runQuery;
