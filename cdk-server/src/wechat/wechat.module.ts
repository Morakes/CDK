import { Module } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { WechatController } from './wechat.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WechatController],
  providers: [WechatService, PrismaService],
})
export class WechatModule {}
