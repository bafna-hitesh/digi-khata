import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

// eslint-disable-next-line no-use-before-define
class Mistake extends Model<InferAttributes<Mistake>, InferCreationAttributes<Mistake>> {
  declare id: CreationOptional<string>;

  declare tag: string;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

Mistake.init(
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
    tableName: 'mistakes',
    sequelize,
  },
);

export default Mistake;
