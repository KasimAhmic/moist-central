import { join } from 'node:path';

import { config as dotenv } from 'dotenv';
import { DataSource } from 'typeorm';

import { appConfigSchema } from './src/app-config/app-config.schema';

const { parsed } = dotenv({ path: '.env.local' });

const config = appConfigSchema.validate(parsed ?? {});

if (config.error) {
  console.error(config.error);

  throw new Error('Failed to validate config schema');
}

const datasource = new DataSource({
  type: 'sqlite',
  database: config.value.DATABASE_NAME,
  entities: [join(__dirname, 'src', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'src', 'common', 'migrations', '**', '*.{ts,js}')],
});

console.log(datasource.options);

export default datasource;
