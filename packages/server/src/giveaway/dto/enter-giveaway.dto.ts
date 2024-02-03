import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export enum Platform {
  YouTube = 'youtube',
  Twitch = 'twitch',
}

export class EnterGiveawayDto {
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  @ValidateIf((dto) => dto.amount !== null)
  amount: number | null;

  @IsString()
  @ValidateIf((dto) => dto.item !== null)
  item: string | null;

  @IsEnum(Platform)
  platform: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ValidateIf((dto) => dto.description !== null)
  description: string | null;

  @IsString()
  @IsEmail()
  email: string;
}
