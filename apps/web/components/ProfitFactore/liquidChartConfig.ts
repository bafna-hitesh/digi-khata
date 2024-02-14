export function liquidChartConfig(data: { currentProfit: number; maxValue: number; height: number }) {
  return {
    percent: data.currentProfit / data.maxValue,
    radius: 0.7,
    height: data.height,
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
        formatter: () => `${data.currentProfit}`,
      },
    },
  };
}
