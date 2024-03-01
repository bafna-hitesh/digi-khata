interface TinyColumnChartConfigType {
  data: number[];
  height: number;
  autoFit: boolean;
  tooltip: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customContent: (title: string, data: any[]) => string;
  };
}

export default TinyColumnChartConfigType;
