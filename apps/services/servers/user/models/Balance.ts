import { DataTypes } from 'sequelize';
import { sequelize } from '../../order/loaders/sequelize';

const Balance = sequelize.define(
  'Balance',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    broker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balanceDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    equityOpeningBalance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    commodityOpeningBalance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: 'balance',
  },
);

export default Balance;
