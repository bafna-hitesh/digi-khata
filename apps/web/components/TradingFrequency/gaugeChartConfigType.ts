interface GaugeChartConfigType {
  percent: number;
  width: number;
  height: number;
  range: {
    color: string;
  };
  startAngle: number;
  endAngle: number;
  indicator?: false;
  statistic: {
    title: {
      style: {
        fontSize: string;
        color: string;
        fontWeight: string;
      };
      formatter: () => string;
    };
  };
}

export default GaugeChartConfigType;
