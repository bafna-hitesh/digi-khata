import ProgressbarProps from './propType';

const Progressbar = ({ width, type }: ProgressbarProps) => {
  return (
    <div className='progressbar_container'>
      <span className='progressbar_grid_container'>
        <span className='progressbar' data-progressbar-type={type}>
          <span className='accepted_progress' data-progressbar-color={type} style={{ width: `${width}%` }} />
        </span>
      </span>
    </div>
  );
};

export default Progressbar;
