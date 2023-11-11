import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

// eslint-disable-next-line no-use-before-define
class Strategy extends Model<InferAttributes<Strategy>, InferCreationAttributes<Strategy>> {
  declare id: CreationOptional<string>;

  declare tag: string;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

Strategy.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    tag: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'strategies',
    sequelize,
  },
);

export default Strategy;
