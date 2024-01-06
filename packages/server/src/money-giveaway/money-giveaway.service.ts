import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { MoneyGiveawayDto } from './dto/money-giveaway.dto';
import { MoneyGiveawayEntity } from './entities/money-giveaway.entity';

@Injectable()
export class MoneyGiveawayService {
  constructor(
    @InjectRepository(MoneyGiveawayEntity)
    private readonly moneyGiveawayRepository: Repository<MoneyGiveawayEntity>,
  ) {}

  create(moneyGiveawayDto: MoneyGiveawayDto) {
    const entry = this.moneyGiveawayRepository.create(moneyGiveawayDto);

    return this.moneyGiveawayRepository.save(entry);
  }

  findAll() {
    return this.moneyGiveawayRepository.find();
  }

  findOne(id: string) {
    return this.moneyGiveawayRepository.findOneBy({ id });
  }

  removeAll() {
    return this.moneyGiveawayRepository.clear();
  }

  remove(id: string) {
    return this.moneyGiveawayRepository.delete({ id });
  }
}
