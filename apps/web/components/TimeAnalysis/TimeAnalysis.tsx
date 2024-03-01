// import styles from '../Dashboard/Dashboard.module.scss';

interface TradeData {
  time: string;
  total_trades: number;
  profit_loss: string;
  total_profit_percent: number;
  total_loss_percent: number;
  overall_return: number;
}

const data: TradeData[] = [
  {
    time: '9am-10am',
    total_trades: 14,
    profit_loss: '8:6',
    total_profit_percent: 11,
    total_loss_percent: -3,
    overall_return: 3,
  },
  {
    time: '10am-11am',
    total_trades: 14,
    profit_loss: '8:6',
    total_profit_percent: 11,
    total_loss_percent: -3,
    overall_return: 3,
  },
  {
    time: '11am-12pm',
    total_trades: 14,
    profit_loss: '8:6',
    total_profit_percent: 11,
    total_loss_percent: -3,
    overall_return: 3,
  },
  {
    time: '12pm-1pm',
    total_trades: 14,
    profit_loss: '8:6',
    total_profit_percent: 11,
    total_loss_percent: -3,
    overall_return: 3,
  },
  {
    time: '1pm-2pm',
    total_trades: 14,
    profit_loss: '8:6',
    total_profit_percent: 11,
    total_loss_percent: -3,
    overall_return: 3,
  },
  {
    time: '2pm-3pm',
    total_trades: 14,
    profit_loss: '8:6',
    total_profit_percent: 11,
    total_loss_percent: -3,
    overall_return: 3,
  },
  {
    time: '3pm-4pm',
    total_trades: 14,
    profit_loss: '8:6',
    total_profit_percent: 11,
    total_loss_percent: -3,
    overall_return: 3,
  },
];

const TimeAnalysis = () => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid #303030',
        borderRadius: '22px',
        padding: '24px',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {data.map((each: TradeData) => {
        return (
          <div style={{ width: '190px', height: 'auto', margin: '0rem 2rem 1rem' }}>
            <p style={{ fontWeight: '600', textAlign: 'center' }}>{each.time}</p>
            <div style={{ display: 'grid', gap: '3px' }}>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total trades</span>
                <span>{each.total_trades}</span>
              </span>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Profit/Loss</span>
                <span>{each.profit_loss}</span>
              </span>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total profits(%)</span>
                <span>{each.total_profit_percent}</span>
              </span>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total loss(%)</span>
                <span>{each.total_loss_percent}</span>
              </span>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Overall return</span>
                <span>{each.overall_return}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeAnalysis;
