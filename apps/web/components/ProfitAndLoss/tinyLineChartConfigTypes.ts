interface TinyLineChartConfigType {
  data: number[];
  autoFit: boolean;
  smooth: boolean;
  height: number;
  padding: number;
  lineStyle: {
    stroke: string;
  };
  point: {
    size: number;
    shape: string;
  };
  tooltip: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customContent: (title: string, data: any[]) => string;
  };
}

export default TinyLineChartConfigType;
