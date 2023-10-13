import { SVGProps } from 'react';

const ZerodhaLogo = ({ height, width }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width ?? '24'}
    height={height ?? '16'}
    viewBox={`0 0 ${width ?? '24'} ${height ?? '16'}`}
  >
    <g fillRule='nonzero' fill='none'>
      <path fill='#F6461A' d='M8 0L0 8l8 8 8-8 8-8z' />
      <path fill='#DB342C' d='M8 16l8-8 8 8z' />
    </g>
  </svg>
);

export default ZerodhaLogo;
