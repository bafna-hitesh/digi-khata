import { DataTypes } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

const WaitlistedUser = sequelize.define(
  'WaitlistedUser',
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid Email',
        },
      },
    },
  },
  {
    tableName: 'waitlisted_users',
  },
);

export default WaitlistedUser;
