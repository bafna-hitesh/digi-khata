import express, { Application } from 'express';
import cors from 'cors';
import config from '../config';
import routes from '../api';

export default ({ app }: { app: Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).send('It Works Fine');
  });

  app.use(cors());
  app.use(express.json());
  app.use(routes());

  app
    .listen(config.PORT, () => {
      console.log(`User Service started on port ${config.PORT}!`);
    })
    .on('error', (err) => {
      console.error('Error in User Service ', err);
      process.exit(1);
    });
};
