import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, Min, ValidateIf } from 'class-validator';

export enum GiveawayType {
  Item = 'item',
  Money = 'money',
}

export class CreateGiveawayDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(GiveawayType)
  type: GiveawayType;

  @IsBoolean()
  open: boolean;

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
