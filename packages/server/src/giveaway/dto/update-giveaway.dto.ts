import { PartialType } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsString, Min, ValidateIf } from 'class-validator';

import { CreateGiveawayDto, GiveawayType } from './create-giveaway.dto';

export class UpdateGiveawayDto extends PartialType(CreateGiveawayDto) {
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  @Min(0)
  @ValidateIf((dto) => dto.type === GiveawayType.Money && dto.minimumAmount !== null)
  minimumAmount: number | null;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  @ValidateIf((dto) => dto.type === GiveawayType.Money && dto.maximumAmount !== null)
  maximumAmount: number | null;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ValidateIf((dto) => dto.type === GiveawayType.Item)
  items: string[] | null;
}
