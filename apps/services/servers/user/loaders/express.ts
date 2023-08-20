import { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import config from '../config';

interface ErrorInterface {
  status: number;
  message: string
}

export default ({ app }: { app: Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).send('It Works Fine');
  });

  app.use(cors());

  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
  
  app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}!`);  
  })
  .on('error', (err) => {
    console.error('Error in server ', err);
    process.exit(1);
  });
};
