import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import swaggerSpec from '../swaggerSpec';

export default ({ app }: { app: Application }) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve Swagger JSON at /api-docs/json
  app.get('/api-docs/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
