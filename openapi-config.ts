import { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:8080/api/docs-json',
  apiFile: './packages/client/src/apis/empty.api.ts',
  apiImport: 'emptyApi',
  outputFile: './packages/client/src/apis/base-moist-central.api.ts',
  exportName: 'baseMoistCentralApi',
  hooks: true,
  flattenArg: true,
  useEnumType: true,
};

export default config;
