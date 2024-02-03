import { Test, TestingModule } from '@nestjs/testing';

import { GiveawayController } from './giveaway.controller';
import { GiveawayService } from './giveaway.service';

describe('MoneyGiveawayController', () => {
  let controller: GiveawayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiveawayController],
      providers: [GiveawayService],
    }).compile();

    controller = module.get<GiveawayController>(GiveawayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
