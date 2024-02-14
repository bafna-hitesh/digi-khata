import { Datum } from "@ant-design/charts";
import { renderStatistic } from "./renderStatistic";

export function pieChartConfig(data: { type: string; value: number; }[]) {
    return {
      data,
      width: 150,
      height: 80,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      padding: 1,
      innerRadius: 0.6,
      label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
          textAlign: 'center',
          fontSize: 12,
        },
      },

      //center area of pie chart 
      statistic: { 
        title: {
          offsetY: -4,
          style: {
            fontSize: '12px',
            color: '#fff'
          },
          customHtml: (container: HTMLElement, view: any, datum: Datum | undefined) => {
            const { width, height } = container.getBoundingClientRect();
            const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
            const text = datum ? datum.type : 'Total';
            return renderStatistic(d, text, {
              fontSize: 20,
            });
          },
        },
        content: {
          offsetY: 4,
          style: {
            fontSize: '12px',
            color: '#fff'
          },
          customHtml: (container: HTMLElement, view: any, datum: Datum | undefined) => {
            const { width } = container.getBoundingClientRect();
            const text = datum ? `₹ ${datum.value}` : `${data.reduce((r: any, d: { value: any; }) => r + d.value, 0)}`;
            return renderStatistic(width, text, {
              fontSize: 20,
            });
          },
        },
      },

      //hover effect on chart
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
        {
          type: 'pie-statistic-active',
        },
      ],
      legend: false // remove legend from pie chart use "false" but type error occures
    };
  }
  
  