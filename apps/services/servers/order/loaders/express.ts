import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from '../config';
import routes from '../api';

export default async ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(routes());

  // Disable X-Powered-By for security
  app.disable('x-powered-by');

  app
    .listen(config.ORDER_MS_PORT, () => {
      console.log('---------------------------------------------------');
      console.log('\n\x1b[33m%s\x1b[0m', `Order Service started on port ${config.ORDER_MS_PORT}`, '\u001b[0m\n');
      console.log('---------------------------------------------------');
    })
    .on('error', (err) => {
      console.error('Error in Order Service ', err);
      process.exit(1);
    });
};
