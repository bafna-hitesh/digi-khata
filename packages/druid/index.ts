import runQuery from './runQuery';
import * as query from './query';

function getAllData(routerURL: string, user: string, broker: string, type: string, freq: string, startDate: any, endDate: any) {
  let parameters = [
    { "type": "TIMESTAMP", "value": startDate},
    { "type": "TIMESTAMP", "value": endDate },
  ]
  return runQuery(routerURL, query.getAllData, parameters);
}

export {
  getAllData
}