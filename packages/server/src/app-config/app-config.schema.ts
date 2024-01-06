import Joi from 'joi';

export interface MoistCentralConfig {
  HOST: string;
  PORT: number;
  API_PREFIX: string;
  DOCS_PATH: string;
  NODE_ENV: string;

  DATABASE_NAME: string;
}

export const appConfigSchema = Joi.object<MoistCentralConfig, true>({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().default(8080),
  API_PREFIX: Joi.string().default('api'),
  DOCS_PATH: Joi.string().default('api/docs'),
  NODE_ENV: Joi.string().default(process.env.NODE_ENV || 'development'),

  DATABASE_NAME: Joi.string().default('moist-central.sqlite3'),
});
