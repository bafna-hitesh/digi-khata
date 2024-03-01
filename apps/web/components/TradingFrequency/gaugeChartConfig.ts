import type GaugeChartConfigType from './gaugeChartConfigType';

const gaugeChartConfig = (): GaugeChartConfigType => {
  return {
    percent: 0.75,
    width: 105,
    height: 80,
    range: {
      color: 'l(0) 0:#B8E1FF 1:#3D76DD',
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: undefined,
    statistic: {
      title: {
        // offsetY: -36,
        style: {
          fontSize: '22px',
          color: '#1C1B20',
          fontWeight: 'bold',
        },
        formatter: () => '70%',
      },
    },
  };
};

export default gaugeChartConfig;
