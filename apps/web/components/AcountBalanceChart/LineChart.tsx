import { Line } from '@ant-design/charts';
import lineChartConfig from './lineChartConfig';
import { LineChartPropsType } from './accountBalanceCardType'; // Assuming LineChartPropsType is defined in this file

const LineChart = ({ weekdayData }: LineChartPropsType) => {
  const config = lineChartConfig(weekdayData);
  return (
    <div style={{ height: '210px' }}>
      <Line {...config} />
    </div>
  );
};

export default LineChart;
