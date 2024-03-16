import { Pagination } from 'antd';

const PerformanceByStrategyPagination = () => {
  return (
    <Pagination
      style={{ margin: '1rem auto' }}
      responsive
      size='small'
      simple
      disabled
      showSizeChanger={false}
      defaultCurrent={1}
      total={10}
      hideOnSinglePage={false}
    />
  );
};

export default PerformanceByStrategyPagination;
