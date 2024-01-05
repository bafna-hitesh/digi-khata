import axios from './axiosInstance';

const getAllTradesForTheDay = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const tradeResponse = await axios.get('/order/trades/get-trades-for-day', { headers });
  return tradeResponse?.data;
};

type TradeType = 'FUTURES' | 'OPTIONS' | 'COMMODITY' | 'EQUITY' | 'CURRENCY' | 'Unknown';

const getTradeTypeFromTradingSymbol = (tradingSymbol: string): TradeType => {
  // Check for Futures: Usually have 'FUT' in the symbol
  if (tradingSymbol.includes('FUT')) {
    return 'FUTURES';
  }

  // Check for Options: Usually have 'CE' or 'PE' for Call or Put options
  if (tradingSymbol.includes('CE') || tradingSymbol.includes('PE')) {
    return 'OPTIONS';
  }

  // Check for Commodity: Usually have 'MCX' in the symbol
  if (tradingSymbol.includes('MCX') || tradingSymbol.includes('CRUDE') || tradingSymbol.includes('GOLD')) {
    return 'COMMODITY';
  }

  // Check for Equity: Usually NSE or BSE stocks without any suffix or prefix
  if (
    !tradingSymbol.includes(':') &&
    !tradingSymbol.includes('-') &&
    !tradingSymbol.includes('FUT') &&
    !tradingSymbol.includes('CE') &&
    !tradingSymbol.includes('PE')
  ) {
    return 'EQUITY';
  }

  // Check for Currency: Usually have 'CDS' in the symbol
  if (tradingSymbol.includes('CDS') || tradingSymbol.includes('USDINR') || tradingSymbol.includes('EURINR')) {
    return 'CURRENCY';
  }

  // If the trading symbol doesn't match any known patterns, return 'Unknown'
  return 'Unknown';
};

export { getAllTradesForTheDay, getTradeTypeFromTradingSymbol };
