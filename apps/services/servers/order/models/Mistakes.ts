import { DataTypes } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

const Mistake = sequelize.define(
  'Mistake',
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
  },
  {
    tableName: 'mistakes',
  },
);

export default Mistake;
