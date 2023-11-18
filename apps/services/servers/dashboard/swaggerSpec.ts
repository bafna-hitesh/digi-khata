import swaggerJSDoc from 'swagger-jsdoc';
import config from './config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Dashboard API',
    version: '1.0.0',
    description: 'This is the API documentation for the Dashboard Microservice.',
  },
  servers: [
    {
      url: `http://localhost:${config.DASHBOARD_MS_PORT}/api-docs/json`,
      description: 'Development server',
    },
  ],
  // ... You can add other global level definitions here
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions (e.g., your route files)
  apis: [
    './**/*.ts',
    '!./node_modules/**', // Exclude node_modules
    '!./dist/**', // Exclude dist folder
    '!./build/**', // Exclude build folder
    '!**/*.d.ts', // Exclude TypeScript definition files
  ],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
