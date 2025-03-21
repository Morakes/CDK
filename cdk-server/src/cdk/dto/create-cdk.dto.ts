import { IsString, IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class CreateCdkDto {
  @IsString()
  title: string;

  @IsString()
  code: string;

  @IsString()
  reward: string;

  @IsBoolean()
  isValid: boolean;

  @IsDateString()
  endTime: Date | null;

  @IsNumber()
  gameId: number;
}
