import runQuery from './runQuery';
import * as query from './query';

function getAllData(routerURL: string) {
  return runQuery(routerURL, query.getAllData);
}

export {
  getAllData
}