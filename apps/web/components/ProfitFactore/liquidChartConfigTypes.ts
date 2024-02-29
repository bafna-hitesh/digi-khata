interface LiquidDataType {
  currentProfit: number;
  maxValue: number;
  height: number;
}

interface LiquidChartConfigType {
  percent: number;
  radius: number;
  height: number;
  outline: {
    border: number;
    distance: number;
    color: string;
  };
  wave: {
    length: number;
    count: number;
  };
  statistic: {
    content: {
      style: {
        fontSize: string;
        fill: string;
        lineHeight: number;
      };
      formatter: () => string;
    };
  };
}

export type { LiquidDataType, LiquidChartConfigType };
