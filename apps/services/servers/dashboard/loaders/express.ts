import { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ErrorInterface } from '../types/error';
import config from '../config';
import routes from '../api';
import bodyParser from 'body-parser';

export default async ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(routes());

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Inside 404');
    const err: any = new Error('Not found');
    err['status'] = 404;
    next(err);
  });

  app.use((err: ErrorInterface, req: Request, res: Response) => {
    console.log('Inside error handler');
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

  app
    .listen(config.DASHBOARD_MS_PORT, () => {
      console.log(`Dasboard Service started on port ${config.DASHBOARD_MS_PORT}`);
    })
    .on('error', (err) => {
      console.error('Error in Order Service ', err);
      process.exit(1);
    });
};
