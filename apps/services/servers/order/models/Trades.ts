import { sequelize } from '../loaders/sequelize';
import { DataTypes } from 'sequelize';

const Trade = sequelize.define(
  'Trade',
  {
    user: {
      type: DataTypes.STRING,
    },
    broker: {
      type: DataTypes.STRING,
    },
    symbol: {
      type: DataTypes.STRING,
    },
    tradeDate: {
      type: DataTypes.DATEONLY
    },
    exchange: {
      type: DataTypes.STRING,
    },
    segment: {
      type: DataTypes.STRING,
    },
    transactionType: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DOUBLE
    },
    tradeID: {
      type: DataTypes.STRING,
    },
    orderID: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: 'trades',
  },
);

export default Trade;
