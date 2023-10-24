import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import config from '../config';
import routes from '../api';
import { ErrorInterface } from '../types/error';

export default ({ app }: { app: Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).send('It Works Fine');
  });

  app.use(cors());
  app.use(express.json());
  app.use(routes());

  class HttpError extends Error {
    status: number;

    constructor(message: string, status: number) {
      super(message);
      this.status = status;
    }
  }

  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: Error = new HttpError('Not Found', 404);
    next(err);
  });

  app.use((err: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
    next();
  });

  app
    .listen(config.PORT, () => {
      console.log(`User Service started on port ${config.PORT}!`);
    })
    .on('error', (err) => {
      console.error('Error in User Service ', err);
      process.exit(1);
    });
};
