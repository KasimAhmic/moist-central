import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:8080/api/docs-json',
  apiFile: './src/apis/empty.api.ts',
  apiImport: 'emptyApi',
  outputFile: './src/apis/base-moist-central.api.ts',
  exportName: 'baseMoistCentralApi',
  hooks: true,
  flattenArg: true,
};

export default config;
