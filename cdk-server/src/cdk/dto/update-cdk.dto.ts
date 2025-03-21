import { PartialType } from '@nestjs/mapped-types';
import { CreateCdkDto } from './create-cdk.dto';

export class UpdateCdkDto extends PartialType(CreateCdkDto) {}
