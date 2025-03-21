import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WechatModule } from './wechat/wechat.module';
import { BannerModule } from './banner/banner.module';
import { CdkModule } from './cdk/cdk.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [WechatModule, BannerModule, CdkModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
