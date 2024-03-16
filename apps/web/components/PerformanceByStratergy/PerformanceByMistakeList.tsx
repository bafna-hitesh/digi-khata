import Progressbar from '@components/ProgressBar/ProgressBar';

interface Data {
  key: string;
  loss: string;
  profit: string;
}

interface Props {
  data: Data;
}

const PerformanceByStrategyList = ({ data }: Props) => {
  const { key, profit, loss } = data;
  return (
    <table className='full-width'>
      <tbody>
        <tr key={data.key} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <td className='full-width'>
            <span style={{ whiteSpace: 'pre-wrap' }}>{key}</span>
          </td>
          <td aria-label='Progress Label' className='full-width'>
            <Progressbar width={loss} type='loss' />
          </td>
          <td aria-label='Progress Label' className='full-width'>
            <Progressbar width={profit} type='profit' />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PerformanceByStrategyList;
