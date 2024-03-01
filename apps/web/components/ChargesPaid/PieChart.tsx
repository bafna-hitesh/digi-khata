import { Pie } from '@ant-design/charts';
import pieChartConfig from './pieChartConfig';

const PieChart = () => {
  const chargesPaidData = [
    {
      type: 'Broker',
      value: 27,
    },
    {
      type: 'GST',
      value: 25,
    },
  ];

  const config = pieChartConfig(chargesPaidData);
  return (
    <div style={{ height: '100px' }}>
      <Pie {...config} />
    </div>
  );
};

export default PieChart;
