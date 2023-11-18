import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from '../config';
import routes from '../api';

export default async ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(routes());

  app
    .listen(config.DASHBOARD_MS_PORT, () => {
      console.log(`Dasboard Service started on port ${config.DASHBOARD_MS_PORT}`);
    })
    .on('error', (err) => {
      console.error('Error in Order Service ', err);
      process.exit(1);
    });
};
