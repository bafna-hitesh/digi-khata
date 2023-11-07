import { DataTypes } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

const Setup = sequelize.define(
  'Setup',
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
    tableName: 'setup',
  },
);

export default Setup;
