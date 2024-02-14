import { Gauge } from '@ant-design/charts';
import { gaugeChartConfig } from './gaugeChartConfig';

const GaugeChart = () => {
  const config = gaugeChartConfig();

  return (
    <div style={{ height: '100px' }}>
      <Gauge {...config} />
    </div>
  );
};

export default GaugeChart;
