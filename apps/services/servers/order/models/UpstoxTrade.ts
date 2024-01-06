import { DataTypes, Model, Op } from 'sequelize';
import { sequelize } from '../loaders/sequelize';
import { Mistake } from './Mistake';
import { Strategy } from './Strategy';

interface IUpstoxTrade {
  id: string;
  userId: string;
  brokerName: string;
  tradeDate: Date;
  exchange: string;
  product: string;
  trading_symbol: string;
  instrument_token: string;
  order_type: string;
  transaction_type: string;
  quantity: number;
  exchange_order_id: string;
  order_id: string;
  exchange_timestamp: string;
  average_price: number;
  trade_id: string;
  order_ref_id: string;
  order_timestamp: string;
  segment: string;
}

class UpstoxTrade extends Model<IUpstoxTrade, Partial<IUpstoxTrade>> {
  static async findOrCreateTrade(upstoxTradeDetails: IUpstoxTrade, userId: string) {
    const [upstoxTrade, created] = await UpstoxTrade.findOrCreate({
      where: { trade_id: upstoxTradeDetails.trade_id },
      defaults: upstoxTradeDetails,
    });

    if (created) {
      console.log(`Created new Upstox Trade for user: ${userId} with Trade ID: ${upstoxTrade.get('trade_id')}`);
    } else {
      console.log(`Already found Upstox Trade for user: ${userId} with Trade ID: ${upstoxTrade.get('trade_id')}`);
    }

    return upstoxTrade;
  }

  static async createBulkTrades(upstoxTradesDetails: IUpstoxTrade[], userId: string) {
    console.log('Creating bulk Upstox trades for user: ', userId);
    // Can lead to inconsistencies if some insert fails due to any reason
    const [upstoxTrades] = await UpstoxTrade.bulkCreate(upstoxTradesDetails, { ignoreDuplicates: true });
    return upstoxTrades;
  }

  static async findAllTrades(userId: string, startDate: Date, endDate: Date, segment: string) {
    console.log(`
    Finding all Upstox trades with userId: ${userId}, segment: ${segment}, startDate: ${startDate}, endDate: ${endDate}`);
    const upstoxTrades = await UpstoxTrade.findAll({
      where: {
        userId,
        segment,
        tradeDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return upstoxTrades;
  }

  static async findTrade(tradeId: string, userId: string) {
    console.log(`Finding Upstox trade ${tradeId} on user ${userId}`);
    const upstoxTrade = await UpstoxTrade.findOne({
      where: {
        trade_id: tradeId,
        userId,
      },
    });
    return upstoxTrade;
  }

  static async getAllDataForTrade(tradeId: string, userId: string) {
    console.log(`Getting all Upstox trade ${tradeId} data on user ${userId}`);
    const upstoxTradeData = await UpstoxTrade.findOne({
      where: {
        trade_id: tradeId,
        userId,
      },
      include: [{ all: true }], // Include Model Associations
    });
    return upstoxTradeData;
  }

  static async getAllTradesForUser(userId: string) {
    console.log(`Getting all Upstox trades for user: ${userId}`);
    const upstoxTradesData = await UpstoxTrade.findAll({
      where: {
        userId,
      },
      include: [{ all: true }], // Include Model Associations
    });
    return upstoxTradesData;
  }

  static async getAllMistakesForTrade(tradeId: string, userId: string) {
    console.log(`Getting all Mistakes for Upstox Trade: ${tradeId} on user: ${userId}`);
    const mistakesForUpstoxTrade = await UpstoxTrade.findOne({
      where: {
        trade_id: tradeId,
        userId,
      },
      attributes: [],
      include: {
        model: Mistake,
        attributes: ['tag'],
      },
    });
    return mistakesForUpstoxTrade;
  }

  static async getAllStrategiesForTrade(tradeId: string, userId: string) {
    console.log(`Getting all Strategies for Upstox Trade: ${tradeId} on user: ${userId}`);
    const strategiesForUpstoxTrade = await UpstoxTrade.findOne({
      where: {
        trade_id: tradeId,
        userId,
      },
      attributes: [],
      include: {
        model: Strategy,
        attributes: ['tag'],
      },
    });
    return strategiesForUpstoxTrade;
  }
}

UpstoxTrade.init(
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
      allowNull: false,
    },
    tradeDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    exchange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trading_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instrument_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.ENUM('BUY', 'SELL'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    exchange_order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchange_timestamp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    average_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    trade_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    order_ref_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_timestamp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'UpstoxTrade',
    tableName: 'upstox_trades',
    sequelize,
  },
);

Mistake.belongsToMany(UpstoxTrade, { through: 'upstox_trade_mistake' });
UpstoxTrade.belongsToMany(Mistake, { through: 'upstox_trade_mistake' });

Strategy.belongsToMany(UpstoxTrade, { through: 'upstox_trade_strategy' });
UpstoxTrade.belongsToMany(Strategy, { through: 'upstox_trade_strategy' });

export { UpstoxTrade, IUpstoxTrade };
