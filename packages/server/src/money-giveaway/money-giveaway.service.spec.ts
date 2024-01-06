import { Test, TestingModule } from '@nestjs/testing';
import { MoneyGiveawayService } from './money-giveaway.service';

describe('MoneyGiveawayService', () => {
  let service: MoneyGiveawayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyGiveawayService],
    }).compile();

    service = module.get<MoneyGiveawayService>(MoneyGiveawayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
