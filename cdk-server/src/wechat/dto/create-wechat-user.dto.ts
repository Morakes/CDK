import { IsString } from 'class-validator';

export class CreateWechatUserDto {
  @IsString()
  code: string; // 微信小程序登录时获取的code
}
