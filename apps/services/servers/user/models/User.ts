import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

interface IUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  country?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: Date;
  settings?: object;
  createdAt: Date;
  updatedAt: Date;
}
class User extends Model<IUser, Partial<IUser>> {
  static async findOrCreateUser({
    email,
    username,
    firstName,
    lastName,
    profilePicture,
  }: Pick<IUser, 'email' | 'username' | 'firstName' | 'lastName' | 'profilePicture'>): Promise<IUser> {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        username,
        email,
        firstName,
        lastName,
        profilePicture,
        lastLogin: new Date(), // Set the lastLogin for a new user
      },
    });

    if (!created) {
      // Update the lastLogin if the user already exists
      await user.update({ lastLogin: new Date() });
    }

    return user.get({ plain: true }) as IUser;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    profilePicture: {
      type: DataTypes.STRING, // URL or path to the image
    },
    country: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active',
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
    settings: {
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
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  },
);

export { IUser };
export default User;
