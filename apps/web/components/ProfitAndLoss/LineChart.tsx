import { TinyLine } from '@ant-design/charts';
import { tinyLineChartConfig } from './tinyLineChartConfig';

const LineChart = () => {
  const data = [5, 15, 10, 13]; //for better UI, we need to display minimum data

  const config = tinyLineChartConfig(data);

  return <TinyLine {...config} />;
};
export default LineChart;
