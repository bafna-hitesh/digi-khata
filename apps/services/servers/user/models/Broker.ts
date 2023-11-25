import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../loaders/sequelize';
import User, { IUser } from './User';

interface IBrokerAccount {
  accountId?: string; // UUID
  userId: string; // UUID, reference to User model
  brokerName: string;
  brokerType: string;
  accountDetails: unknown;
  accessTokens: {
    accessToken?: string;
    refreshToken?: string;
    publicToken?: string;
  };
  brokerUserProfile: unknown;
  portfolioSnapshot: unknown;
  transactionHistory: unknown;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  customFields: unknown;
  settings: unknown;
}

class BrokerAccount extends Model {
  static async findOrCreateBroker(
    user: IUser,
    brokerProfile: Partial<IBrokerAccount>,
    brokerName: string,
  ): Promise<BrokerAccount> {
    // Extract necessary data from brokerProfile
    const brokerAccessToken = brokerProfile?.accessTokens?.accessToken;

    // Find or create BrokerAccount
    const [brokerAccount, created] = await BrokerAccount.findOrCreate({
      where: {
        userId: user.id,
        brokerName,
      },
      defaults: brokerProfile,
    });

    // Update broker account if it already exists and the access token has changed
    if (!created && brokerAccessToken !== (brokerAccount as Partial<IBrokerAccount>)?.accessTokens?.accessToken) {
      await brokerAccount.update({
        accessTokens: brokerProfile?.accessTokens,
        brokerProfile,
      });
    }

    return brokerAccount;
  }

  static async getActiveBrokerTokens(userId: string) {
    const activeBrokerAccounts = await BrokerAccount.findAll({
      where: {
        userId,
        isActive: true,
      },
      attributes: ['brokerName', 'accessTokens'],
    });

    return activeBrokerAccounts.map((account) => ({
      brokerName: account.dataValues.brokerName,
      tokens: account.dataValues.accessTokens,
    }));
  }
}

// Continue with the rest of the class definition...

BrokerAccount.init(
  {
    accountId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    brokerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessTokens: {
      type: DataTypes.JSONB,
    },
    brokerUserProfile: {
      type: DataTypes.JSONB,
    },
    portfolioSnapshot: {
      type: DataTypes.JSONB,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    customFields: {
      type: DataTypes.JSONB,
    },
    settings: {
      type: DataTypes.JSONB,
    },
  },
  {
    sequelize,
    modelName: 'BrokerAccount',
    tableName: 'broker_accounts',
    timestamps: true, // If you want Sequelize to automatically manage createdAt and updatedAt
  },
);

BrokerAccount.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(BrokerAccount, { foreignKey: 'userId' });

export default BrokerAccount;
