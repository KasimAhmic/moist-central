import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum Platform {
  YouTube = 'youtube',
  Twitch = 'twitch',
}

export class MoneyGiveawayDto {
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  amount: number;

  @IsEnum(Platform)
  platform: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsEmail()
  paypalEmail: string;
}
