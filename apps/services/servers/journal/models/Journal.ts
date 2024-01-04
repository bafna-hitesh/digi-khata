import { DataTypes, Model, STRING } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

interface IJournal {
  id: string;
  userId: string;
  tradeId: string;
  brokerName: string;
  journal: string;
  images: string[];
}
class Journal extends Model<IJournal, Partial<IJournal>> {
  static async findOrCreateJournal(tradeId: string, brokerName: string, userId: string) {
    const [journalDetails, created] = await Journal.findOrCreate({
      where: {
        tradeId,
        brokerName,
        userId,
      },
    });
    if (created) {
      console.log(`Created new journal on trade: ${tradeId}, broker: ${brokerName}, userId: ${userId}`);
    } else {
      console.log(`Already found a journal on trade: ${tradeId}, broker: ${brokerName}, userId: ${userId}`);
    }
    return journalDetails;
  }

  static async getJournal(tradeId: string, brokerName: string, userId: string) {
    console.log(`Getting journal on trade: ${tradeId}, broker: ${brokerName}, userId: ${userId}`);
    const journalDetails = await Journal.findOne({
      where: {
        tradeId,
        brokerName,
        userId,
      },
    });
    return journalDetails;
  }
}

Journal.init(
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
    tradeId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    brokerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    journal: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(STRING),
      defaultValue: [],
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Journal',
    tableName: 'journals',
    timestamps: true,
  },
);

export { IJournal };
export default Journal;
