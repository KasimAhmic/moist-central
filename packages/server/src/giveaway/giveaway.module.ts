import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from '../app-config/app-config.module';
import { GiveawayEntry } from './entities/giveaway-entry.entity';
import { Giveaway } from './entities/giveaway.entity';
import { GiveawayController } from './giveaway.controller';
import { GiveawayService } from './giveaway.service';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Giveaway, GiveawayEntry])],
  controllers: [GiveawayController],
  providers: [GiveawayService],
})
export class GiveawayModule {}
