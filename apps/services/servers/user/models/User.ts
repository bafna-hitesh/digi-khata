import { sequelize } from '../loaders/sequelize';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kiteUserID: {
        type: DataTypes.STRING
    },
    clientToken: {
        type: DataTypes.STRING,
    },
    kiteAccessToken: {
        type: DataTypes.STRING
    },
    kiteUserDetails: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'Users'
});

export default User;