import type TinyLineChartConfigType from './tinyLineChartConfigTypes';

const tinyLineChartConfig = (profitAndLossData: number[]): TinyLineChartConfigType => {
  return {
    data: profitAndLossData,
    autoFit: true,
    smooth: true,
    height: 70,
    padding: 8,
    lineStyle: {
      stroke: '#5B8FF9',
    },
    point: {
      size: 6, // Adjust the size of the markers
      shape: 'circle',
    },
    tooltip: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      customContent: (title: string, data: any[]) => {
        const displayData = data[0]?.value;
        return `<p style="font-size: 14px; color: #1C1B20; font-weight: 800; padding: -10px 8px">P&amp;L: ${displayData}</p>`;
      },
    },
  };
};

export default tinyLineChartConfig;
