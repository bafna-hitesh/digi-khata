import { Datum } from '@ant-design/charts';

interface PieChartConfigType {
  data: { type: string; value: number }[];
  width: number;
  height: number;
  angleField: string;
  colorField: string;
  radius: number;
  padding: number;
  innerRadius: number;
  label: {
    type: string;
    offset: string;
    content: string;
    style: {
      textAlign: string;
      fontSize: number | string;
    };
  };
  statistic: {
    title: {
      offsetY: number;
      style: {
        fontSize: string;
        color: string;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      customHtml: (container: HTMLElement, view: any, datum: Datum | undefined) => string;
    };
    content: {
      offsetY: number;
      style: {
        fontSize: string;
        color: string;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      customHtml: (container: HTMLElement, view: any, datum: Datum | undefined) => string;
    };
  };
  interactions: { type: string }[];
  legend: undefined; // Change type to boolean to match usage
}

export default PieChartConfigType;
