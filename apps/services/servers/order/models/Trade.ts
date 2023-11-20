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

// Defining Trade Model Configuration
// Model needs 2 types, Attributes and CreationAttributes.
// Can use InferAttributes to directly infer the types when defining the model configuration. Similar is for InferCreationAttributes
// eslint-disable-next-line no-use-before-define
class Trade extends Model<InferAttributes<Trade>, InferCreationAttributes<Trade>> {
  // CreationOptional field meaning not necessary to define at creation of Trade instance
  declare id: CreationOptional<string>;

  declare name: string;

  declare broker: string;

  declare symbol: string;

  declare tradeDate: Date;

  declare exchange: string;

  declare segment: string;

  declare transactionType: string;

  declare quantity: number;

  declare price: number;

  declare tradeID: string;

  declare orderID: string;

  declare orderTimestamp: Date;

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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'trades',
    sequelize,
  },
);

Mistake.belongsToMany(Trade, { through: 'trade_mistake' });
Trade.belongsToMany(Mistake, { through: 'trade_mistake' });

Strategy.belongsToMany(Trade, { through: 'trade_strategy' });
Trade.belongsToMany(Strategy, { through: 'trade_strategy' });

export default Trade;
