import { join } from 'node:path';

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { MoneyGiveawayModule } from './money-giveaway/money-giveaway.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        type: 'sqlite',
        database: configService.get('DATABASE_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        migrations: [join(__dirname, 'common', 'migrations', '**', '*.{ts,js}')],
        migrationsRun: true,
      }),
    }),
    ScheduleModule.forRoot(),
    MoneyGiveawayModule,
  ],
})
export class AppModule {}
