import { Application } from 'express';
import expressLoader from './express';
import { sequelizeLoader } from './sequelize';
import swaggerLoader from './swagger';
import errorLoader from './errors';
import { consumeDashboardEvents, syncAllBrokersOrdersInBackground, syncAllBrokersTradesInBackground } from './kafka';

export default async ({ expressApp }: { expressApp: Application }) => {
  expressLoader({ app: expressApp });
  swaggerLoader({ app: expressApp });
  sequelizeLoader();
  syncAllBrokersOrdersInBackground();
  syncAllBrokersTradesInBackground();
  consumeDashboardEvents();
  errorLoader({ app: expressApp });
};
