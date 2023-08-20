export interface ProcessEnv {
  PORT: string;
  LOGGER: string;
  NODE_ENV: string;
  SERVER_NAME: string,
  DATABASE_URL: string,
  POSTGRES_USER: string,
  POSTGRES_PASSWORD: string,
  POSTGRES_HOST: string,
  POSTGRES_DATABASE: string,
  KAFKA_HOST: string,
}