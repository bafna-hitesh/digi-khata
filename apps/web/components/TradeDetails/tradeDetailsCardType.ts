interface TradeType {
  date: string;
  'P&L': number;
  trades: number;
}

interface TradeCardPropsType {
  trade: TradeType;
}

export type { TradeType, TradeCardPropsType };
