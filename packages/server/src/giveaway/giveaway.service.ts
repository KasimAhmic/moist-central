import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOneOptions, Repository } from 'typeorm';

import { AppConfigService } from '../app-config/app-config.service';
import { CreateGiveawayDto, GiveawayType } from './dto/create-giveaway.dto';
import { EnterGiveawayDto } from './dto/enter-giveaway.dto';
import { UpdateGiveawayDto } from './dto/update-giveaway.dto';
import { GiveawayEntry } from './entities/giveaway-entry.entity';
import { Giveaway } from './entities/giveaway.entity';

@Injectable()
export class GiveawayService {
  constructor(
    private readonly configService: AppConfigService,
    @InjectRepository(Giveaway)
    private readonly giveawayRepository: Repository<Giveaway>,
    @InjectRepository(GiveawayEntry)
    private readonly giveawayEntryRepository: Repository<GiveawayEntry>,
  ) {}

  createGiveaway(dto: CreateGiveawayDto) {
    const giveaway = this.giveawayRepository.create(this.sanitizeGiveaway(dto));

    return this.giveawayRepository.save(giveaway);
  }

  findAllGiveaways() {
    return this.giveawayRepository.find();
  }

  async findGiveaway(giveawayId: number, options?: Omit<FindOneOptions<Giveaway>, 'where'>) {
    const giveaway = await this.giveawayRepository.findOne({ where: { id: giveawayId }, ...options });

    if (!giveaway) {
      throw new NotFoundException(`Giveaway with id ${giveawayId} not found`);
    }

    return giveaway;
  }

  async updateGiveaway(giveawayId: number, dto: UpdateGiveawayDto) {
    const originalGiveaway = await this.findGiveaway(giveawayId);

    dto = this.sanitizeGiveaway(dto);

    if (originalGiveaway.type !== dto.type) {
      await this.removeAllGiveawayEntries(giveawayId);
    }

    return await this.giveawayRepository.save(dto);
  }

  removeGiveaway(giveawayId: number) {
    return this.giveawayRepository.delete({ id: giveawayId });
  }

  removeAllGiveaways() {
    return this.giveawayRepository.clear();
  }

  async enterGiveaway(giveawayId: number, dto: EnterGiveawayDto) {
    if (this.configService.get('DEDUPE_GIVEWAY_ENTRIES')) {
      const existingEntry = await this.giveawayEntryRepository.findOne({
        where: { giveawayId, email: dto.email },
      });

      if (existingEntry) {
        throw new BadRequestException(`You have already entered this giveaway`);
      }
    }

    const giveaway = await this.findGiveaway(giveawayId);

    dto = this.sanitizeGiveawayEntry(giveaway, dto);

    this.validateGiveawayEntry(giveaway, dto);

    const entry = this.giveawayEntryRepository.create(dto);

    entry.giveawayId = giveaway.id;

    return this.giveawayEntryRepository.save(entry);
  }

  findAllGiveawayEntries(giveawayId: number) {
    return this.giveawayEntryRepository.find({ where: { giveawayId } });
  }

  async findGiveawayEntry(entryId: number, options?: Omit<FindOneOptions<GiveawayEntry>, 'where'>) {
    const entry = await this.giveawayEntryRepository.findOne({ where: { id: entryId }, ...options });

    if (!entry) {
      throw new NotFoundException(`Giveaway entry with id ${entryId} not found`);
    }

    return entry;
  }

  removeAllGiveawayEntries(giveawayId: number) {
    return this.giveawayEntryRepository.delete({ giveawayId });
  }

  removeGiveawayEntry(entryId: number) {
    return this.giveawayEntryRepository.delete({ id: entryId });
  }

  private sanitizeGiveaway<T extends CreateGiveawayDto | UpdateGiveawayDto>(dto: T): T {
    if (dto.type === 'money') {
      dto.items = null;
    }

    if (dto.type === 'item') {
      dto.minimumAmount = null;
      dto.maximumAmount = null;
    }

    return dto;
  }

  private sanitizeGiveawayEntry(giveaway: Giveaway, dto: EnterGiveawayDto) {
    if (giveaway.type === GiveawayType.Money) {
      dto.item = null;
    } else if (giveaway.type === GiveawayType.Item) {
      dto.amount = null;
    }

    return dto;
  }

  private validateGiveawayEntry(giveaway: Giveaway, dto: EnterGiveawayDto) {
    if (giveaway.type === GiveawayType.Money) {
      if (giveaway.minimumAmount !== null && dto.amount < giveaway.minimumAmount) {
        throw new BadRequestException(`Amount cannot be less than ${giveaway.minimumAmount}`);
      }

      if (giveaway.maximumAmount !== null && dto.amount > giveaway.maximumAmount) {
        throw new BadRequestException(`Amount cannot be greater than ${giveaway.maximumAmount}`);
      }
    } else if (giveaway.type === GiveawayType.Item) {
      if (!giveaway.items.includes(dto.item)) {
        throw new BadRequestException(`Item must be one of ${giveaway.items.join(', ')}`);
      }
    }
  }
}
