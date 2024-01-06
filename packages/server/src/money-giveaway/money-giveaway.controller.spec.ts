import { Test, TestingModule } from '@nestjs/testing';
import { MoneyGiveawayController } from './money-giveaway.controller';
import { MoneyGiveawayService } from './money-giveaway.service';

describe('MoneyGiveawayController', () => {
  let controller: MoneyGiveawayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyGiveawayController],
      providers: [MoneyGiveawayService],
    }).compile();

    controller = module.get<MoneyGiveawayController>(MoneyGiveawayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
