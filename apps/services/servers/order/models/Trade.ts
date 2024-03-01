import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../loaders/sequelize';
import Mistake from './Mistake';
import Strategy from './Strategy';

interface ITrade {
  id: string;
  userId: string;
  brokerName: string;
  tradingsymbol: string;
  tradeDate: Date;
  exchange: string;
  product: string;
  segment: string;
  instrument_token: string;
  order_type?: string;
  transaction_type: string;
  quantity: number;
  exchange_order_id?: string;
  average_price: number;
  trade_id: string;
  order_id: string;
  order_timestamp: string;
  exchange_timestamp: string;
  order_ref_id?: string;
  fill_timestamp?: string;
}

// Defining Trade Model Configuration
// Model needs 2 types, Attributes and CreationAttributes.
// Can use InferAttributes to directly infer the types when defining the model configuration. Similar is for InferCreationAttributes
// eslint-disable-next-line no-use-before-define
class Trade extends Model<InferAttributes<Trade>, InferCreationAttributes<Trade>> {
  // CreationOptional field meaning not necessary to define at creation of Trade instance
  declare id: CreationOptional<string>;

  declare userId: string;

  declare brokerName: string;

  declare tradingsymbol: string;

  declare tradeDate: Date;

  declare exchange: string;

  declare product: string;

  declare segment: string;

  declare instrument_token: string;

  declare order_type: CreationOptional<string>;

  declare transaction_type: string;

  declare quantity: number;

  declare exchange_order_id: CreationOptional<string>;

  declare average_price: number;

  declare trade_id: string;

  declare order_id: string;

  declare order_timestamp: string;

  declare exchange_timestamp: string;

  declare order_ref_id: CreationOptional<string>;

  declare fill_timestamp: CreationOptional<string>;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

  // Defining all the association functions for Mistakes
  declare getMistakes: BelongsToManyGetAssociationsMixin<Mistake>;

  declare addMistake: BelongsToManyAddAssociationMixin<Mistake, string>;

  declare addMistakes: BelongsToManyAddAssociationsMixin<Mistake, string>;

  declare setMistakes: BelongsToManySetAssociationsMixin<Mistake, string>;

  declare removeMistake: BelongsToManyRemoveAssociationMixin<Mistake, string>;

  declare removeMistakes: BelongsToManyRemoveAssociationsMixin<Mistake, string>;

  declare createMistake: BelongsToManyCreateAssociationMixin<Mistake>;

  declare hasMistake: BelongsToManyHasAssociationMixin<Mistake, string>;

  declare hasMistakes: BelongsToManyHasAssociationsMixin<Mistake, string>;

  declare countMistakes: BelongsToManyCountAssociationsMixin;

  // Defining all the association functions for Strategy
  declare getStrategies: BelongsToManyGetAssociationsMixin<Strategy>;

  declare addStrategy: BelongsToManyAddAssociationMixin<Strategy, string>;

  declare addStrategies: BelongsToManyAddAssociationsMixin<Strategy, string>;

  declare setStrategy: BelongsToManySetAssociationsMixin<Strategy, string>;

  declare removeStrategy: BelongsToManyRemoveAssociationMixin<Strategy, string>;

  declare removeStrategies: BelongsToManyRemoveAssociationsMixin<Strategy, string>;

  declare createStrategy: BelongsToManyCreateAssociationMixin<Strategy>;

  declare hasStrategy: BelongsToManyHasAssociationMixin<Strategy, string>;

  declare hasStrategies: BelongsToManyHasAssociationsMixin<Strategy, string>;

  declare countStrategies: BelongsToManyCountAssociationsMixin;
}

Trade.init(
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
    tradingsymbol: {
      type: DataTypes.STRING,
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
    segment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instrument_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_type: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
    },
    average_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    trade_id: {
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
    order_timestamp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_ref_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fill_timestamp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    modelName: 'Trade',
    tableName: 'trades',
    sequelize,
  },
);

Mistake.belongsToMany(Trade, { through: 'trade_mistake' });
Trade.belongsToMany(Mistake, { through: 'trade_mistake' });

Strategy.belongsToMany(Trade, { through: 'trade_strategy' });
Trade.belongsToMany(Strategy, { through: 'trade_strategy' });

export { ITrade };
export default Trade;
