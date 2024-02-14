import { TinyColumn } from '@ant-design/charts';
import { tinyColumnChartConfig } from './tinyColumnChartConfig';

export const TinyColumnChart = () => {
  const data = [274, 337, 81, 497, 666, 219, 269];

  const config = tinyColumnChartConfig(data);

  return <TinyColumn {...config} />;
};
