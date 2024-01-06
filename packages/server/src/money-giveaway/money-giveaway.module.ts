import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoneyGiveawayEntity } from './entities/money-giveaway.entity';
import { MoneyGiveawayController } from './money-giveaway.controller';
import { MoneyGiveawayService } from './money-giveaway.service';

@Module({
  imports: [TypeOrmModule.forFeature([MoneyGiveawayEntity])],
  controllers: [MoneyGiveawayController],
  providers: [MoneyGiveawayService],
})
export class MoneyGiveawayModule {}
