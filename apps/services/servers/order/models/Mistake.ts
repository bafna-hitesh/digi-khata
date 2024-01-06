import { Model, DataTypes, Op } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

interface IMistake {
  id: string;
  tag: string;
}

class Mistake extends Model<IMistake, Partial<IMistake>> {
  static async findOrCreateMistake(tag: string) {
    const [mistake, created] = await Mistake.findOrCreate({
      where: { tag },
      defaults: tag,
    });

    if (created) {
      console.log(`Created new mistake with tag: ${tag}`);
    } else {
      console.log(`Already found mistake with tag: ${tag}`);
    }

    return mistake;
  }

  static async findAllMistakesStartingWithLetter(startsWith: string) {
    console.log(`Finding all mistakes that start with: ${startsWith}`);

    const mistakes = await Mistake.findAll({
      where: {
        tag: {
          [Op.startsWith]: startsWith,
        },
      },
      attributes: ['tag'],
    });

    return mistakes;
  }

  static async getMistakeDetails(tag: string) {
    console.log(`Getting mistake details with tag: ${tag}`);

    const mistake = await Mistake.findOne({
      where: { tag },
      plain: true,
    });

    return mistake;
  }
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
  },
  {
    tableName: 'mistakes',
    sequelize,
  },
);

export { Mistake, IMistake };
