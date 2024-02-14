export function tinyColumnChartConfig(data: number[]) {
  return {
    height: 70,
    autoFit: false,
    data,
    tooltip: {
      customContent: (title: string, data: any[]) => {
        return `NO.${title}: ${data[0]?.data?.y.toFixed(2)}`;
      },
    },
  };
}
