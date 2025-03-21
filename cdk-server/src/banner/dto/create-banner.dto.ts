import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  imageUrl: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}