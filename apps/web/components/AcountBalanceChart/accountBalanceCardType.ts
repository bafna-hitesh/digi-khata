// Define the WeekdayData interface
interface WeekdayDataType {
  day: string;
  amount: number;
}

interface LineChartPropsType {
  weekdayData: WeekdayDataType[];
}

export type { WeekdayDataType, LineChartPropsType };
