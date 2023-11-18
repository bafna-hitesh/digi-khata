import express, { Application } from 'express';
import cors from 'cors';
import config from '../config';
import routes from '../api';

export default async ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(express.json());
  app.use(routes());

  app
    .listen(config.ORDER_MS_PORT, () => {
      console.log(`Order Service started on port ${config.ORDER_MS_PORT}`);
    })
    .on('error', (err) => {
      console.error('Error in Order Service ', err);
      process.exit(1);
    });
};
