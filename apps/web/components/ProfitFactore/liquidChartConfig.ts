import type { LiquidChartConfigType, LiquidDataType } from './liquidChartConfigTypes';

const liquidChartConfig = (data: LiquidDataType): LiquidChartConfigType => {
  const { currentProfit, maxValue, height } = data;

  const percent = currentProfit / maxValue;

  return {
    percent,
    radius: 0.7,
    height,
    outline: {
      border: 3,
      distance: 0,
      color: '#1C1B20',
    },
    wave: {
      length: 50,
      count: 3,
    },
    statistic: {
      content: {
        style: {
          fontSize: '40px',
          fill: '#1C1B20',
          lineHeight: 1,
        },
        formatter: () => `${currentProfit}`,
      },
    },
  };
};

export default liquidChartConfig;
