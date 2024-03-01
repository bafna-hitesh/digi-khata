import { TinyColumn } from '@ant-design/charts';
import tinyColumnChartConfig from './tinyColumnChartConfig';

const TinyColumnChart = () => {
  const maxDrawdownData = [274, 337, 81, 497, 666, 219, 269];

  const config = tinyColumnChartConfig(maxDrawdownData);

  return <TinyColumn {...config} />;
};

export default TinyColumnChart;
