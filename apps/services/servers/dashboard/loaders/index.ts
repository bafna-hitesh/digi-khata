import { Application } from 'express';
import expressLoader from './express';
import { sequelizeLoader } from './sequelize';
import swaggerLoader from './swagger';
import errorLoader from './errors';

export default async ({ expressApp }: { expressApp: Application }) => {
  expressLoader({ app: expressApp });
  swaggerLoader({ app: expressApp });
  sequelizeLoader();
  errorLoader({ app: expressApp });
};
