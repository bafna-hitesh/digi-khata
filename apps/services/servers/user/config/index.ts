import dotenv from 'dotenv';
import { ProcessEnv } from '../types/environment';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'DEV';

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export default {
  PORT: process.env.USER_MS_PORT || 5010,
  LOGGER: process.env.LOGGER,
  NODE_ENV: process.env.NODE_ENV,
  SERVER_NAME: process.env.SERVER_NAME,

  KITE_API_KEY: process.env.KITE_API_KEY,
  KITE_API_SECRET: process.env.KITE_API_SECRET,
  KITE_BASE_URL: process.env.KITE_BASE_URL,
  KITE_REDIRECT_URL: process.env.KITE_REDIRECT_URL,

  DATABASE_URL: process.env.DATABASE_URL,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,

  KAFKA_HOST: process.env.KAFKA_HOST,

  APP_HOME_URL: process.env.APP_HOME_URL,
  APP_LOGIN_URL: process.env.APP_LOGIN_URL,
  APP_SECRET: process.env.APP_SECRET,
} as ProcessEnv;
