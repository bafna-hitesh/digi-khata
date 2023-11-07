import { DataTypes } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

const Trade = sequelize.define(
  'Trade',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    broker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
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
    segment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tradeID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mistakes: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: [],
    },
    setup: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: 'trades',
  },
);

export default Trade;
