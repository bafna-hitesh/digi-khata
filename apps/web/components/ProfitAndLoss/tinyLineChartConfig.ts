export function tinyLineChartConfig(data: number[]) {
  return {
    data,
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
      customContent: (value: string, data: any[]) => {
        const displayData = data[0]?.value;
        return `<p style="font-size: 14px; color: #1C1B20; font-weight: 800; padding: -10px 8px">P&amp;L: ${displayData}</p>`;
      },
    },
  };
}
