import { DataTypes, Model, Op } from 'sequelize';
import { sequelize } from '../loaders/sequelize';
import Mistake from './Mistake';
import Strategy from './Strategy';

interface IKiteTrade {
  id: string;
  userId: string;
  brokerName: string;
  tradeDate: Date;
  trade_id: string;
  order_id: string;
  exchange_order_id: string | null;
  tradingsymbol: string;
  exchange: string;
  instrument_token: string;
  transaction_type: string;
  product: string;
  average_price: number;
  filled: number;
  fill_timestamp: Date;
  order_timestamp: Date;
  exchange_timestamp: Date;
  segment: string;
}

class KiteTrade extends Model<IKiteTrade, Partial<IKiteTrade>> {
  static async findOrCreateTrade(kiteTradeDetails: IKiteTrade) {
    const [kiteTrade, created] = await KiteTrade.findOrCreate({
      where: { order_id: kiteTradeDetails.trade_id },
      defaults: kiteTradeDetails,
    });

    if (created) {
      console.log('Created new Kite Trade with ID: ', kiteTrade.get('trade_id'));
    } else {
      console.log('Already found Kite Trade with ID: ', kiteTrade.get('trade_id'));
    }

    return kiteTrade;
  }

  static async createBulkTrades(kiteTradesDetails: IKiteTrade[], userId: string) {
    console.log('Creating bulk Kite orders for user: ', userId);
    // Can lead to inconsistencies if some insert fails due to any reason
    const [kiteTrades] = await KiteTrade.bulkCreate(kiteTradesDetails);
    return kiteTrades;
  }

  static async findAllTrades(userId: string, startDate: Date, endDate: Date, segment: string) {
    console.log(`
    Finding all Kite orders with userId: ${userId}, segment: ${segment}, startDate: ${startDate}, endDate: ${endDate}`);
    const kiteTrades = await KiteTrade.findAll({
      where: {
        userId,
        segment,
        tradeDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return kiteTrades;
  }
}

KiteTrade.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    brokerName: {
      type: DataTypes.STRING,
      defaultValue: 'KITE',
      allowNull: false,
    },
    tradeDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    trade_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchange_order_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tradingsymbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instrument_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.ENUM('BUY', 'SELL'),
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    average_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    filled: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fill_timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    order_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    exchange_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    segment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'KiteTrade',
    tableName: 'kite_trades',
    sequelize,
  },
);

Mistake.belongsToMany(KiteTrade, { through: 'kite_trade_mistake' });
KiteTrade.belongsToMany(Mistake, { through: 'kite_trade_mistake' });

Strategy.belongsToMany(KiteTrade, { through: 'kite_trade_strategy' });
KiteTrade.belongsToMany(Strategy, { through: 'kite_trade_strategy' });

export { KiteTrade, IKiteTrade };
