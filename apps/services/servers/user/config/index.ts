import dotenv from 'dotenv';
import { ProcessEnv } from '../types/environment';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'DEV';

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export default {
  PORT: process.env.PORT || 5000,
  LOGGER: process.env.LOGGER,
  NODE_ENV: process.env.NODE_ENV,
  SERVER_NAME: process.env.SERVER_NAME,
  DATABASE_URL: process.env.DATABASE_URL,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  KAFKA_HOST: process.env.KAFKA_HOST,
} as ProcessEnv;