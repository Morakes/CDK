import { Module } from '@nestjs/common';
import { CdkService } from './cdk.service';
import { CdkController } from './cdk.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CdkController],
  providers: [CdkService, PrismaService],
})
export class CdkModule {}
