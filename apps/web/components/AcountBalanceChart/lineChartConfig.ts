import { WeekdayDataType } from './accountBalanceCardType';

const lineChartConfig = (weekdayData: WeekdayDataType[]) => {
  return {
    data: weekdayData,
    xField: 'day',
    yField: 'amount',
    label: {
      style: {
        fill: '#fff',
      },
    },
    yAxis: {
      grid: null,
    },
    point: {
      size: 6,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    lineStyle: {
      stroke: '#5B8FF9',
    },
    smooth: true,
    state: {
      active: {
        style: {
          // shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
};

export default lineChartConfig;
