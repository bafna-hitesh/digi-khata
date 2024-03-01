import { Liquid } from '@ant-design/charts';
import liquidChartConfig from './liquidChartConfig';

const LiquidChart = () => {
  const profitFactor = {
    currentProfit: 2,
    maxValue: 10,
    height: 150,
  };

  const config = liquidChartConfig(profitFactor);
  return (
    <div style={{ height: '100px' }}>
      <Liquid {...config} />
    </div>
  );
};
export default LiquidChart;
