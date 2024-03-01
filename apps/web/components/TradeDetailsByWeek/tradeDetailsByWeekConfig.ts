import WeekdayDataType from './tradeDetailsByWeekType';

const tradeDetailsByWeekColConfig = (weekdayData: WeekdayDataType[]) => {
  return {
    data: weekdayData,
    xField: 'day',
    yField: 'amount',
    stack: true,
    yAxis: {
      grid: null,
      line: null,
      label: null,
    },
    xAxis: {
      line: null,
      grid: null,
      label: null,
    },
    seriesField: 'day',
    interactions: [
      {
        type: 'active-region',
        enable: true,
      },
      { type: 'element-highlight', enable: true },
    ],
    geometryOptions: [
      {
        geometry: 'column',
        label: {
          visible: true, // Show the label
          position: 'middle', // Display label in the middle of the column
          style: {
            fill: '#fff', // Label text color
            fontSize: 12, // Label font size
            fontWeight: 'bold', // Label font weight
          },
        },
      },
    ],
    columnBackground: {
      style: {
        fill: 'rgba(0,0,0,0.1)',
      },
    },
  };
};

export default tradeDetailsByWeekColConfig;
