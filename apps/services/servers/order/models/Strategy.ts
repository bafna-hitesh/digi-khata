import { DataTypes, Model, Op } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

interface IStrategy {
  id: string;
  tag: string;
}

class Strategy extends Model<IStrategy, Partial<IStrategy>> {
  static async findOrCreateStrategy(tag: string) {
    const [strategy, created] = await Strategy.findOrCreate({
      where: { tag },
      defaults: tag,
    });

    if (created) {
      console.log(`Created new strategy with tag: ${tag}`);
    } else {
      console.log(`Already found strategy with tag: ${tag}`);
    }

    return strategy;
  }

  static async findAllStrategysStartingWithLetter(startsWith: string) {
    console.log(`Finding all strategies that start with: ${startsWith}`);
    const strategies = Strategy.findAll({
      where: {
        tag: {
          [Op.like]: `${startsWith}%`,
        },
      },
      attributes: ['tag'],
    });
    return strategies;
  }

  static async getStrategyDetails(tag: string) {
    console.log(`Getting strategy details with tag: ${tag}`);

    const strategy = await Strategy.findOne({
      where: { tag },
      plain: true,
    });

    return strategy;
  }
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
  },
  {
    tableName: 'strategies',
    sequelize,
  },
);

export { Strategy, IStrategy };
