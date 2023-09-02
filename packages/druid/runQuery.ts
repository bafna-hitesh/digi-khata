import axios from 'axios';

function runQuery(routerURL: string, query: string) {
  let headers = {
    'Content-Type': 'application/json'
  }
  return axios.post(routerURL + '/druid/v2/sql', { query }, { headers });
}

export default runQuery;