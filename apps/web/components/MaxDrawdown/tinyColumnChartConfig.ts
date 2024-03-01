import TinyColumnChartConfigType from './tinyColChartConfigType';

const tinyColumnChartConfig = (maxDrawdownData: number[]): TinyColumnChartConfigType => {
  return {
    data: maxDrawdownData,
    height: 70,
    autoFit: false,
    tooltip: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      customContent: (title: string, data: any[]) => {
        return `NO.${title}: ${data[0]?.data?.y.toFixed(2)}`;
      },
    },
  };
};

export default tinyColumnChartConfig;
