import { ConfigGetOptions, ConfigService, NoInferType, Path, PathValue } from '@nestjs/config';

import { MoistCentralConfig } from './app-config.schema';

export class AppConfigService extends ConfigService<MoistCentralConfig, true> {
  constructor() {
    super();
  }

  // This method overrides the `get` method in ConfigService to force type inference and save us from having to add
  // `{ infer: true }` in every single `configService.get` call
  override get<
    PropertyPath extends Path<MoistCentralConfig>,
    ReturnValue = PathValue<MoistCentralConfig, PropertyPath>,
  >(
    propertyPath: PropertyPath,
    defaultValue?: NoInferType<ReturnValue>,
    options?: Omit<ConfigGetOptions, 'infer'>,
  ): ReturnValue {
    return super.get<MoistCentralConfig, PropertyPath, ReturnValue>(propertyPath, defaultValue, {
      infer: true,
      ...options,
    });
  }
}
