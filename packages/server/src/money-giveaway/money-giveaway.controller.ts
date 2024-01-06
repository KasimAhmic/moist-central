import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MoneyGiveawayDto } from './dto/money-giveaway.dto';
import { MoneyGiveawayService } from './money-giveaway.service';

@Controller('money-giveaway')
@ApiTags('Money Giveaway')
export class MoneyGiveawayController {
  constructor(private readonly moneyGiveawayService: MoneyGiveawayService) {}

  @Post()
  submitMoneyGiveawayEntry(@Body() moneyGiveawayDto: MoneyGiveawayDto) {
    return this.moneyGiveawayService.create(moneyGiveawayDto);
  }

  @Get()
  findAllMoneyGiveawayEntries() {
    return this.moneyGiveawayService.findAll();
  }

  @Get(':id')
  findMoneyGiveawayEntry(@Param('id', ParseUUIDPipe) id: string) {
    return this.moneyGiveawayService.findOne(id);
  }

  @Delete()
  removeAllMoneyGiveawayEntries() {
    return this.moneyGiveawayService.removeAll();
  }

  @Delete(':id')
  removeMoneyGiveawayEntry(@Param('id', ParseUUIDPipe) id: string) {
    return this.moneyGiveawayService.remove(id);
  }
}
