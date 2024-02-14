import { pieChartConfig } from './pieChartConfig';
import { Pie } from '@ant-design/charts';

export const PieChart = () => {
  const data = [
    {
      type: 'Broker',
      value: 27,
    },
    {
      type: 'GST',
      value: 25,
    },
  ];

  const config = pieChartConfig(data);
  return (
    <div style={{ height: '100px' }}>
      <Pie {...config} />
    </div>
  );
};
